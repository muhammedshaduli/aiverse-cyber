import React from 'react';
import Hero from "./animated-shader-hero";

// Demo Component showing how to use the Hero
const HeroDemo: React.FC = () => {
  const handlePrimaryClick = () => {
    console.log('Get Started clicked!');
    // Trigger global scanner page request
    window.dispatchEvent(new CustomEvent("openScanWorkspace"));
  };

  const handleSecondaryClick = () => {
    console.log('Explore Features clicked!');
    // Scroll down to the features section
    const target = document.getElementById("threats");
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      <Hero
        theme="light" // White color theme requested by user
        trustBadge={{
          text: "Securing millions of enterprise communications.",
          icons: ["✨", "🛡️"]
        }}
        headline={{
          line1: "Verify & Secure",
          line2: "Your Generative Workspace"
        }}
        subtitle="Real-time protection against deepfakes, synthetic voice injections, hijacked streams, and generative web threats. Built for high-reliability secure team workflows."
        buttons={{
          primary: {
            text: "Launch Cyber Scanner",
            onClick: handlePrimaryClick
          },
          secondary: {
            text: "Explore Threat Vectors",
            onClick: handleSecondaryClick
          }
        }}
      />
      
      {/* Informative usage guide card */}
      <div className="bg-slate-50 border-t border-slate-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-800 mb-4 font-display">
            How to Use the Reusable Hero Component
          </h2>
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
            <pre className="text-xs text-slate-600 overflow-x-auto font-mono">
{`import Hero from "@/src/components/ui/animated-shader-hero";

// In your view component:
<Hero
  theme="light" // Use "light" for White Color Theme, "dark" for default black theme
  trustBadge={{
    text: "Trusted by forward-thinking teams.",
    icons: ["✨"] // optional
  }}
  headline={{
    line1: "Verify & Secure",
    line2: "Your Generative Workspace"
  }}
  subtitle="Protecting the enterprise boundary from deepfakes and AI-driven security risks."
  buttons={{
    primary: {
      text: "Start Free Scan",
      onClick: handlePrimaryClick
    },
    secondary: {
      text: "Explore Threat Vectors",
      onClick: handleSecondaryClick
    }
  }}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDemo;
