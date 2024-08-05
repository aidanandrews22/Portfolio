import { Octokit } from "@octokit/rest";
import { getDatabase, ref, get, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import { database } from '../firebase';

const octokit = new Octokit({ auth: process.env.REACT_APP_GIT_API });
const db = getDatabase();
const auth = getAuth();

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
  const user = auth.currentUser;
  const publicNotesRef = ref(database, 'notes/public');
  const publicSnapshot = await get(publicNotesRef);
  const publicNotes = publicSnapshot.val() || {};

  let privateNotes = {};
  if (user) {
    const privateNotesRef = ref(database, `notes/private/${user.uid}`);
    const privateSnapshot = await get(privateNotesRef);
    privateNotes = privateSnapshot.val() || {};
  }

  // Convert the notes object to an array
  const notesArray = Object.entries({...publicNotes, ...privateNotes}).map(([id, note]) => ({
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
  } else {
    return fetchGitHubContent(`content/${contentType}s/${contentId}.md`, false);
  }
};

const fetchFirebaseNote = async (noteId) => {
  const user = auth.currentUser;
  
  // First, try to fetch from public notes
  const publicNoteRef = ref(database, `notes/public/${noteId}`);
  const publicSnapshot = await get(publicNoteRef);
  
  if (publicSnapshot.exists()) {
    return publicSnapshot.val();
  }
  
  // If not found in public notes and user is authenticated, try private notes
  if (user) {
    const privateNoteRef = ref(database, `notes/private/${user.uid}/${noteId}`);
    const privateSnapshot = await get(privateNoteRef);
    
    if (privateSnapshot.exists()) {
      return privateSnapshot.val();
    }
  }
  
  throw new Error('Note not found');
};


export const saveContent = async (contentType, contentId, content, title, category, isPublic = false) => {
  if (contentType === 'note') {
    return saveFirebaseNote(contentId, content, title, category, isPublic);
  } else {
    return saveGitHubContent(contentType, contentId, content, title, category);
  }
};

const saveFirebaseNote = async (noteId, content, title, category, isPublic) => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const isAdminUser = await isUserAdmin();
  const now = Date.now();

  let existingDate;
  if (noteId) {
    // Fetch existing note data
    const existingNoteRef = ref(database, isPublic ? `notes/public/${noteId}` : `notes/private/${user.uid}/${noteId}`);
    const existingNoteSnapshot = await get(existingNoteRef);
    if (existingNoteSnapshot.exists()) {
      existingDate = existingNoteSnapshot.val().date;
    }
  }

  const noteData = {
    title,
    content,
    category,
    isPublic: isAdminUser ? isPublic : false,
    lastEdited: now,
    userId: user.uid,
    date: existingDate || now, // Use existing date if available, otherwise use current time
  };

  let notePath;
  if (isAdminUser && isPublic) {
    notePath = `notes/public/${noteId || `note${now}`}`;
  } else {
    notePath = `notes/private/${user.uid}/${noteId || `note${now}`}`;
  }

  if (!noteId) {
    // If it's a new note, use push to generate a unique ID
    const newNoteRef = push(ref(database, notePath));
    await set(newNoteRef, noteData);
    return { success: true, id: newNoteRef.key };
  } else {
    // If it's an existing note, update it
    await set(ref(database, notePath), noteData);
    return { success: true, id: noteId };
  }
};

const saveGitHubContent = async (contentType, contentId, content, title, category) => {
  try {
    const path = `content/${contentType}s/${contentId}.md`;
    const message = `Update ${contentType}: ${title}`;

    // First, get the current file (if it exists)
    let sha;
    try {
      const { data } = await octokit.repos.getContent({
        owner: REPO_OWNER,
        repo: REPO_NAME,
        path,
      });
      sha = data.sha;
    } catch (error) {
      // File doesn't exist yet, which is fine for new content
    }

    // Now create or update the file
    await octokit.repos.createOrUpdateFileContents({
      owner: REPO_OWNER,
      repo: REPO_NAME,
      path,
      message,
      content: Buffer.from(content).toString('base64'),
      sha, // Include this if updating an existing file
    });

    return { success: true };
  } catch (error) {
    console.error('Error saving content to GitHub:', error);
    throw new Error(`Failed to save ${contentType}: ${error.message}`);
  }
};

export const isUserAdmin = async () => {
  const user = auth.currentUser;
  if (!user) return false;

  const adminRef = ref(database, `admins/${user.uid}`);
  const snapshot = await get(adminRef);
  return snapshot.exists();
};
