import { motion } from "framer-motion";
import { useEffect } from "react";

const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="inline-block px-3 py-1.5 bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] text-[var(--color-primary)] rounded-full text-sm font-medium border border-[color-mix(in_oklch,var(--color-primary)_20%,transparent)]">
    {children}
  </span>
);

const VIDEO_CAROUSEL_HEIGHT = 240; // px - constant height, aspect ratio preserved via object-contain

interface VideoCarouselProps {
  title: string;
  videos: { label: string; videoUrl: string }[];
}

const VideoCarousel: React.FC<VideoCarouselProps> = ({ title, videos }) => {
  return (
    <div className="mb-12">
      <h3 className="text-lg font-semibold mb-4 text-[color-mix(in_oklch,currentColor_80%,transparent)]">
        {title}
      </h3>
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {videos.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="flex-shrink-0 snap-start"
            >
              <div
                className="bg-surface rounded-lg overflow-hidden border border-adaptive shadow-md hover:shadow-xl transition-shadow inline-flex items-center justify-center"
                style={{ height: VIDEO_CAROUSEL_HEIGHT, width: 'fit-content' }}
              >
                <video
                  loop
                  autoPlay
                  muted
                  playsInline
                  className="h-full w-auto object-contain"
                  style={{ height: VIDEO_CAROUSEL_HEIGHT }}
                  src={item.videoUrl}
                />
              </div>
              <p className="mt-2 text-xs text-[color-mix(in_oklch,currentColor_60%,transparent)] text-center">
                {item.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function G1Research() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const videoPath = "/research/g1";
  const teleopVideos = [
    { label: "Episode 0", videoUrl: `${videoPath}/teleop-episode_000000.mp4` },
    { label: "Episode 4", videoUrl: `${videoPath}/teleop-episode_000004.mp4` },
    { label: "Episode 8", videoUrl: `${videoPath}/teleop-episode_000008.mp4` },
    { label: "Episode 10", videoUrl: `${videoPath}/teleop-episode_000010.mp4` },
  ];

  const inferenceVideos = [
    { label: "Rollout 1", videoUrl: `${videoPath}/inference_video_20251213_002906_main.mp4` },
    { label: "Rollout 2", videoUrl: `${videoPath}/inference_video_20251213_003200_main.mp4` },
    { label: "Rollout 3", videoUrl: `${videoPath}/inference_video_20251213_030702_main.mp4` },
  ];

  const finetuningVideos = [
    { label: "Front Camera", videoUrl: `${videoPath}/large_ft_front_camera.mp4` },
    { label: "Robot Camera", videoUrl: `${videoPath}/large_ft_robot_camera.mp4` },
  ];

  return (
    <div className="min-h-screen bg-background">
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="pt-8"
      >
        <article className="max-w-4xl mx-auto px-6 py-12">
          {/* Hero */}
          <div className="mb-16">
            <span className="inline-block px-3 py-1 bg-[color-mix(in_oklch,var(--color-primary)_12%,transparent)] text-[var(--color-primary)] rounded-full text-xs font-medium mb-6 border border-[color-mix(in_oklch,var(--color-primary)_20%,transparent)]">
              Fall 2025
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Humanoid Manipulation with Vision-Language-Action Models
            </h1>
            <p className="text-lg text-[color-mix(in_oklch,currentColor_70%,transparent)] mb-2">
              Aidan Andrews
            </p>
            <p className="text-sm text-[color-mix(in_oklch,currentColor_50%,transparent)]">
              KIMLAB · University of Illinois at Urbana-Champaign
            </p>
          </div>

          {/* Hero Image */}
          <div className="relative aspect-video bg-surface rounded-xl overflow-hidden border border-adaptive mb-3 shadow-lg">
            <video
              loop
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
              src="/research/g1/g1.mp4"
            />
          </div>
          <p className="text-center text-xs text-[color-mix(in_oklch,currentColor_50%,transparent)] mb-16">
            Unitree G1 executing pick-and-place task in Isaac Sim using LoRA fine-tuned GR00T N1.5.
          </p>

          {/* Abstract */}
          <section className="mb-16 bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)] rounded-xl p-6 border border-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]">
            <h2 className="text-xl font-semibold mb-4">Abstract</h2>
            <p className="text-[color-mix(in_oklch,currentColor_80%,transparent)] leading-relaxed">
              I built a complete pipeline for deploying vision-language-action models on humanoid robots. 
              The key finding: <strong>LoRA fine-tuning generalizes from just 14 VR demonstrations while 
              full fine-tuning catastrophically overfits</strong>. This project establishes infrastructure 
              for Meta Quest teleoperation, ROS2 integration, and Isaac Sim environments that enables 
              continued research toward autonomous humanoid manipulation.
            </p>
          </section>

          {/* The Problem */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-4 border-b border-adaptive pb-3">
              The Problem
            </h2>
            <p className="text-[color-mix(in_oklch,currentColor_80%,transparent)] leading-relaxed mb-4">
              I wanted to deploy GR00T N1.5 on the Unitree G1 to automate lab tasks. What I thought 
              would be straightforward revealed that current VLAs lack the generalization I expected. 
              Internet data didn't work, teleoperation infrastructure didn't exist, and every layer 
              of the pipeline had to be built from scratch.
            </p>
            <p className="text-[color-mix(in_oklch,currentColor_80%,transparent)] leading-relaxed">
              Three questions emerged: How should VLAs be fine-tuned with limited data? What data 
              collection methods work for humanoids? How do we diagnose performance issues in complex 
              sim-to-real pipelines?
            </p>
          </section>

          {/* Key Finding */}
          <section className="mb-16">
            <div className="bg-[color-mix(in_oklch,var(--color-primary)_8%,transparent)] rounded-xl p-6 border border-[color-mix(in_oklch,var(--color-primary)_20%,transparent)]">
              <h2 className="text-xl font-semibold mb-3 text-[var(--color-primary)]">
                Key Finding
              </h2>
              <p className="text-[color-mix(in_oklch,currentColor_85%,transparent)] leading-relaxed">
                Parameter-efficient fine-tuning isn't just computationally convenient—it's essential 
                for small datasets. Full fine-tuning's loss dropped 250× then flatlined, producing 
                identical trajectories regardless of prompt or object position. LoRA succeeded with 
                the same 14 episodes.
              </p>
            </div>
          </section>

          {/* Results Comparison */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 border-b border-adaptive pb-3">
              Full Fine-tuning vs. LoRA
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-3">
                <div className="aspect-video bg-surface rounded-lg overflow-hidden border border-adaptive">
                  <img
                    src="/tmp/img/full.png"
                    alt="Full fine-tuning loss curve"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-red-500">Full Fine-tuning Failed</h3>
                  <p className="text-sm text-[color-mix(in_oklch,currentColor_70%,transparent)]">
                    100K steps, 10 hours. Loss dropped 250× then flatlined. Model memorized 
                    trajectories—produced identical actions every run.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="aspect-video bg-surface rounded-lg overflow-hidden border border-adaptive">
                  <img
                    src="/tmp/img/lora.png"
                    alt="LoRA fine-tuning loss curve"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-green-500">LoRA Succeeded</h3>
                  <p className="text-sm text-[color-mix(in_oklch,currentColor_70%,transparent)]">
                    8K steps, &lt;1 hour. Proper loss decay. Distinct trajectories, responds 
                    to prompts, completes task successfully.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-lg p-4 border border-adaptive">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-[color-mix(in_oklch,currentColor_60%,transparent)] mb-1">Training Data</p>
                  <p className="font-semibold">14 episodes (15,791 frames)</p>
                </div>
                <div>
                  <p className="text-[color-mix(in_oklch,currentColor_60%,transparent)] mb-1">Collection Method</p>
                  <p className="font-semibold">Meta Quest 3 VR</p>
                </div>
                <div>
                  <p className="text-[color-mix(in_oklch,currentColor_60%,transparent)] mb-1">Task</p>
                  <p className="font-semibold">Pick-and-place</p>
                </div>
              </div>
            </div>
          </section>

          {/* Video Demonstrations */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 border-b border-adaptive pb-3">
              Demonstrations
            </h2>
            
            <VideoCarousel title="VR Teleoperation (Training Data)" videos={teleopVideos} />
            <VideoCarousel title="Model Inference (LoRA Fine-tuned)" videos={inferenceVideos} />
            <VideoCarousel title="Model Inference (Full Fine-tuned)" videos={finetuningVideos} />
          </section>

          {/* Method */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 border-b border-adaptive pb-3">
              Method
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">1. VR Teleoperation</h3>
                <p className="text-[color-mix(in_oklch,currentColor_75%,transparent)] leading-relaxed mb-3">
                  Integrated Meta Quest 3 with Isaac Sim using Unitree's XR_teleoperate package. 
                  Hand and arm tracking mapped directly to G1 joint positions.
                </p>
                <div className="aspect-video bg-surface rounded-lg overflow-hidden border border-adaptive">
                  <img
                    src="/tmp/img/meta.png"
                    alt="VR teleoperation setup"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">2. LoRA Fine-tuning</h3>
                <p className="text-[color-mix(in_oklch,currentColor_75%,transparent)] leading-relaxed">
                  Applied Low-Rank Adaptation (rank 16, alpha 32) to GR00T N1.5. This reduces 
                  trainable parameters by ~100-1000× compared to full fine-tuning, preventing 
                  memorization while enabling task-specific adaptation.
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">3. Stabilization</h3>
                <p className="text-[color-mix(in_oklch,currentColor_75%,transparent)] leading-relaxed">
                  GR00T only controls upper body. Without stabilization, manipulation shifts 
                  center of mass and the robot falls. Solution: increased joint stiffness and 
                  damping for lower body, effectively fixing legs in place during manipulation.
                </p>
              </div>
            </div>
          </section>

          {/* SO-101 Diagnostic */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 border-b border-adaptive pb-3">
              Diagnostic Work: SO-101 Arm
            </h2>
            <div className="grid md:grid-cols-2 gap-6 items-start">
              <div>
                <p className="text-[color-mix(in_oklch,currentColor_80%,transparent)] leading-relaxed mb-4">
                  When initial G1 attempts failed, I validated GR00T on a simpler SO-ARM101 
                  robotic arm. Collected 20 physical teleoperation trajectories, fine-tuned, 
                  and deployed to hardware.
                </p>
                <p className="text-[color-mix(in_oklch,currentColor_80%,transparent)] leading-relaxed">
                  Result: GR00T works correctly with compatible data. The G1 issues were data 
                  quality, not model architecture. This systematic approach—testing on progressively 
                  simpler systems—proved invaluable for debugging.
                </p>
              </div>
              <div className="bg-surface rounded-lg overflow-hidden border border-adaptive">
              <video
                loop
                autoPlay
                muted
                playsInline
                className="w-full h-fit object-cover"
                src="https://raw.githubusercontent.com/aidanandrews22/aidanandrews22.github.io/4967363d7ff70c8d4e64c549589e5c3dc6ca4dd5/content/images/research/so-101.MOV"
                />
              </div>
            </div>
          </section>

          {/* Lessons Learned */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 border-b border-adaptive pb-3">
              What I Learned
            </h2>
            <div className="space-y-3">
              {[
                {
                  title: "Data quality > quantity",
                  desc: "14 high-quality VR demos beat thousands of incompatible internet trajectories."
                },
                {
                  title: "Match train/test exactly",
                  desc: "VLAs can't generalize across different scenes or task spaces—only small perturbations."
                },
                {
                  title: "Start simple",
                  desc: "Validate on easier platforms first. The SO-101 diagnostic saved weeks of debugging."
                },
                {
                  title: "Parameter efficiency matters",
                  desc: "LoRA should be default for small datasets. Full fine-tuning memorizes."
                },
                {
                  title: "Hardware details are critical",
                  desc: "Undocumented servo settings (Goal_Time=0) blocked progress for days."
                }
              ].map((lesson, idx) => (
                <div key={idx} className="flex gap-3 p-4 bg-surface rounded-lg border border-adaptive">
                  <span className="text-[var(--color-primary)] font-bold flex-shrink-0">→</span>
                  <div>
                    <strong className="font-semibold">{lesson.title}:</strong>{" "}
                    <span className="text-[color-mix(in_oklch,currentColor_75%,transparent)]">
                      {lesson.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Future Work */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 border-b border-adaptive pb-3">
              Next Steps
            </h2>
            <div className="space-y-4 text-[color-mix(in_oklch,currentColor_80%,transparent)]">
              <p>
                <strong className="font-semibold">Sim-to-real transfer:</strong> Deploy the 
                pipeline on the physical G1 humanoid.
              </p>
              <p>
                <strong className="font-semibold">Whole-body control:</strong> Integrate LeVERB 
                for locomotion so the robot can walk to manipulation targets.
              </p>
              <p>
                <strong className="font-semibold">Synthetic data:</strong> Use video world models 
                (DreamGen) to generate imagined trajectories and expand training data without 
                additional teleoperation.
              </p>
              <p>
                <strong className="font-semibold">System-1/System-2 architecture:</strong> LLM-based 
                high-level planner with parallel reactive policies (GR00T for manipulation, LeVERB 
                for locomotion) to enable complex multi-step tasks.
              </p>
            </div>
          </section>

          {/* Technical Details */}
          <section className="mb-16 bg-surface rounded-xl p-6 border border-adaptive">
            <div className="flex flex-wrap gap-2 mb-6">
              <Tag>GR00T N1.5</Tag>
              <Tag>Unitree G1</Tag>
              <Tag>LoRA</Tag>
              <Tag>Isaac Sim</Tag>
              <Tag>Meta Quest 3</Tag>
              <Tag>ROS2</Tag>
              <Tag>VR Teleoperation</Tag>
            </div>

            <div className="grid md:grid-cols-2 gap-6 text-sm">
              <div>
                <h4 className="font-semibold mb-2">Hardware</h4>
                <p className="text-[color-mix(in_oklch,currentColor_70%,transparent)]">
                  Unitree G1 (26-DOF, Inspire DFX hands)<br/>
                  SO-ARM101 (6-DOF, Feetech STS3215 servos)<br/>
                  RTX 5090 + RTX 4090
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Software</h4>
                <p className="text-[color-mix(in_oklch,currentColor_70%,transparent)]">
                  NVIDIA Isaac Sim/Lab<br/>
                  PyTorch, ROS2, LeRobot<br/>
                  Unitree XR_teleoperate
                </p>
              </div>
            </div>
          </section>

          {/* Acknowledgements */}
          <section className="text-sm text-[color-mix(in_oklch,currentColor_65%,transparent)]">
            <p>
              Research conducted in KIMLAB under Prof. Joohyung Kim with Sankalp Yamsani 
              as graduate mentor. All experiments run on personal AI server.
            </p>
          </section>
        </article>
      </motion.main>
    </div>
  );
}
