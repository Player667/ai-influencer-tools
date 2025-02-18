import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../LandingPage.css';

function LandingPage() {
  // All the lines we want typed (including the final text)
  const messages = [
    "I want to engage my fans with AI.",
    "I want to build authentic connections.",
    "I want to create personalized content with AI.",
    "Connect with your fans like never before!" // final line typed
  ];

  const typingSpeed = 80;    // ms per character typed
  const erasingSpeed = 50;   // ms per character erased
  const delayBetween = 1000; // ms delay after a line is fully typed before erasing

  const [messageIndex, setMessageIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [showCTA, setShowCTA] = useState(false); // for showing the CTA after final typing

  // Determine if we're on the last message
  const isLastMessage = messageIndex === messages.length - 1;
  // Determine if the current message is fully typed
  const isFullyTyped = typedText.length === messages[messageIndex]?.length;
  // Show cursor only if we haven't fully typed the last message
  const showCursor = !(isLastMessage && isFullyTyped);

  useEffect(() => {
    // If we've typed all messages, do nothing
    if (messageIndex >= messages.length) return;

    const currentMessage = messages[messageIndex];
    let timer;

    if (!deleting) {
      // Typing forward
      if (typedText.length < currentMessage.length) {
        // Add one character
        timer = setTimeout(() => {
          setTypedText(currentMessage.slice(0, typedText.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing current line
        if (!isLastMessage) {
          // If not the last message, wait a bit, then start deleting
          timer = setTimeout(() => setDeleting(true), delayBetween);
        } else {
          // If this is the final message, reveal the CTA
          setShowCTA(true);
        }
      }
    } else {
      // Deleting
      if (typedText.length > 0) {
        // Erase one character
        timer = setTimeout(() => {
          setTypedText(currentMessage.slice(0, typedText.length - 1));
        }, erasingSpeed);
      } else {
        // Once fully erased, move to next message
        setDeleting(false);
        setMessageIndex((prev) => prev + 1);
      }
    }

    return () => clearTimeout(timer);
  }, [typedText, deleting, messageIndex, messages, isLastMessage]);

  return (
    <div className="landing-container">
      <div className="landing-content">
        
        {/* Always display the typed text. Conditionally show the cursor. */}
        <h1 className="typing-text">
          {typedText}
          {showCursor && <span className="typing-cursor" />}
        </h1>

        {/* Show CTA button once final text is fully typed */}
        {showCTA && (
          <Link to="/signup" className="cta-button">
            Get Started
          </Link>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
