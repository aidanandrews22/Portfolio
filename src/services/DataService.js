import { Octokit } from "@octokit/rest";
import { getDatabase, ref, get } from "firebase/database";
import { database } from '../firebase';

const octokit = new Octokit({ auth: process.env.REACT_APP_GIT_API });
const db = getDatabase();

const REPO_OWNER = process.env.REACT_APP_GIT_REPO_OWNER;
const REPO_NAME = process.env.REACT_APP_GIT_REPO_NAME;

export const fetchAllData = async () => {
  let firebaseData = {};
  let githubData = {};

  try {
    firebaseData = await fetchFirebaseData();
  } catch (error) {
    console.error('Error fetching Firebase data:', error);
  }

  try {
    githubData = await fetchGitHubData();
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
  }

  return {
    ...firebaseData,
    ...githubData
  };
};

const fetchFirebaseData = async () => {
  const publicNotesRef = ref(database, 'notes/public');
  const publicSnapshot = await get(publicNotesRef);
  const publicNotes = publicSnapshot.val() || {};

  const notesArray = Object.entries(publicNotes).map(([id, note]) => ({
    id,
    ...note
  }));

  return { 
    notes: notesArray
  };
};

const fetchGitHubContent = async (path, isJson = true) => {
  try {
    const response = await octokit.repos.getContent({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path: path,
    });
    const content = atob(response.data.content);
    return isJson ? JSON.parse(content) : content;
  } catch (error) {
    console.error(`Error fetching content from GitHub: ${path}`, error);
    return isJson ? [] : '';
  }
};

const fetchGitHubData = async () => {
  try {
    const [posts, projects] = await Promise.all([
      fetchGitHubContent('content/posts.json'),
      fetchGitHubContent('content/projects.json')
    ]);

    return { posts, projects };
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return { posts: [], projects: [] };
  }
};

export const fetchContent = async (contentType, contentId) => {
  if (contentType === 'note') {
    return fetchFirebaseNote(contentId);
  } else if (contentType === 'post') {
    return fetchGitHubPost(contentId);
  } else {
    return fetchGitHubContent(`content/${contentType}s/${contentId}.md`, false);
  }
};

const fetchFirebaseNote = async (noteId) => {
  const publicNoteRef = ref(database, `notes/public/${noteId}`);
  const publicSnapshot = await get(publicNoteRef);
  
  if (publicSnapshot.exists()) {
    return publicSnapshot.val();
  }
  
  throw new Error('Note not found');
};

const fetchGitHubPost = async (postId) => {
  const posts = await fetchGitHubContent('content/posts.json');
  const post = posts.find(p => p.id === postId);
  
  if (post) {
    const content = await fetchGitHubContent(post.content, false);
    return { ...post, content };
  }
  
  throw new Error('Post not found');
};