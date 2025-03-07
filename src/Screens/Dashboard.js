import React, { useEffect, useRef, useState } from "react";
import styles from "../Dashboard.module.css";
import Replicate from "replicate";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Dashboard() {
  // State for images, prompt, output, and loading
  const [originalImageDataUrl, setOriginalImageDataUrl] = useState(null);
  const [backgroundImg, setBackgroundImg] = useState(null);
  const [outputImages, setOutputImages] = useState([]);
  const [textPrompt, setTextPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  // Canvas and drawing refs
  const canvasRef = useRef(null);
  const canvasWrapperRef = useRef(null); // ref for the canvas wrapper
  const rectanglesRef = useRef([]);
  const selectedRectRef = useRef(null);
  const isDrawingRef = useRef(false);
  const startCoordsRef = useRef({ x: 0, y: 0 });

  // Instantiate Replicate with your API token
  const replicate = new Replicate({
    auth: "r8_DyveRv9IUhQJ4wVmhqOYSvUhGaB5mCg3Mt5uq",
  });

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (backgroundImg) {
      // Ensure the canvas matches the image dimensions
      if (canvas.width !== backgroundImg.width || canvas.height !== backgroundImg.height) {
        canvas.width = backgroundImg.width;
        canvas.height = backgroundImg.height;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
    }

    // Redraw drawn rectangles (mask areas)
    rectanglesRef.current.forEach((rect) => {
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
      ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
      ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
    });
  };

  const highlightRectangle = (rect) => {
    redrawCanvas();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = "#ff4d4d";
    ctx.lineWidth = 3;
    ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
    ctx.lineWidth = 1;
  };

  // Update the canvas wrapper dimensions whenever a new image is set
  useEffect(() => {
    if (backgroundImg && canvasWrapperRef.current) {
      canvasWrapperRef.current.style.width = backgroundImg.width + "px";
      canvasWrapperRef.current.style.height = backgroundImg.height + "px";
      redrawCanvas();
    } else {
      canvasWrapperRef.current.style.width = "800px";
      canvasWrapperRef.current.style.height = "600px";
      redrawCanvas();
    }
  }, [backgroundImg]);

  // Set up canvas mouse events
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const handleMouseDown = (e) => {
      if (selectedRectRef.current) {
        selectedRectRef.current = null;
        redrawCanvas();
        return;
      }
      startCoordsRef.current = { x: e.offsetX, y: e.offsetY };
      isDrawingRef.current = true;
    };

    const handleMouseMove = (e) => {
      if (!isDrawingRef.current) return;
      const { x: startX, y: startY } = startCoordsRef.current;
      const currentX = e.offsetX;
      const currentY = e.offsetY;
      const width = currentX - startX;
      const height = currentY - startY;
      redrawCanvas();
      ctx.strokeStyle = "#4A90E2";
      ctx.fillStyle = "rgba(74, 144, 226, 0.2)";
      ctx.strokeRect(startX, startY, width, height);
      ctx.fillRect(startX, startY, width, height);
    };

    const handleMouseUp = (e) => {
      if (!isDrawingRef.current) return;
      isDrawingRef.current = false;
      const { x: startX, y: startY } = startCoordsRef.current;
      const width = e.offsetX - startX;
      const height = e.offsetY - startY;
      if (Math.abs(width) > 5 && Math.abs(height) > 5) {
        rectanglesRef.current.push({ x: startX, y: startY, width, height });
      }
      redrawCanvas();
    };

    const handleClick = (e) => {
      const mouseX = e.offsetX;
      const mouseY = e.offsetY;
      for (let i = rectanglesRef.current.length - 1; i >= 0; i--) {
        const rect = rectanglesRef.current[i];
        if (
          mouseX >= rect.x &&
          mouseX <= rect.x + rect.width &&
          mouseY >= rect.y &&
          mouseY <= rect.y + rect.height
        ) {
          selectedRectRef.current = rect;
          highlightRectangle(rect);
          return;
        }
      }
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("click", handleClick);

    if (backgroundImg) {
      redrawCanvas();
    }
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("click", handleClick);
    };
  }, [backgroundImg]);

  const undoLastRectangle = () => {
    rectanglesRef.current.pop();
    redrawCanvas();
  };

  const clearCanvas = () => {
    rectanglesRef.current = [];
    redrawCanvas();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      const img = new Image();
      img.onload = () => {
        const maxWidth = 1200;
        const maxHeight = 900;
        let { width, height } = img;
        // Check if scaling is needed
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = width * ratio;
          height = height * ratio;
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          const scaledDataUrl = canvas.toDataURL("image/jpeg", 0.8);
          // Update state with the scaled image data
          setOriginalImageDataUrl(scaledDataUrl);
          const scaledImg = new Image();
          scaledImg.onload = () => {
            setBackgroundImg(scaledImg);
          };
          scaledImg.src = scaledDataUrl;
        } else {
          // Use the original image if it's within bounds
          setOriginalImageDataUrl(dataUrl);
          setBackgroundImg(img);
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
    clearCanvas();
  };
  

  const resizeMaskToMatchImage = (maskDataUrl, targetWidth, targetHeight) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        resolve(canvas.toDataURL("image/png"));
      };
      img.src = maskDataUrl;
    });
  };

  const getImageDimensions = (imageSrc) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.src = imageSrc;
    });
  };

  const resizeImageToMatchMask = (imageSrc, targetWidth, targetHeight) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.src = imageSrc;
    });
  };

  const applyFluxFillPro = async () => {
    if (!originalImageDataUrl) {
      alert("Please upload an image first!");
      return;
    }
    if (rectanglesRef.current.length === 0) {
      alert("Please draw at least one rectangle to define the mask!");
      return;
    }
    if (!textPrompt.trim()) {
      alert("Please enter a text prompt for infill.");
      return;
    }

    setLoading(true);

    const canvas = canvasRef.current;
    const maskCanvas = document.createElement("canvas");
    maskCanvas.width = canvas.width;
    maskCanvas.height = canvas.height;
    const maskCtx = maskCanvas.getContext("2d");

    maskCtx.fillStyle = "#000";
    maskCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);
    rectanglesRef.current.forEach((rect) => {
      maskCtx.fillStyle = "#fff";
      maskCtx.fillRect(rect.x, rect.y, rect.width, rect.height);
    });
    let maskDataUrl = maskCanvas.toDataURL("image/png");

    try {
      const { width, height } = await getImageDimensions(originalImageDataUrl);
      maskDataUrl = await resizeMaskToMatchImage(maskDataUrl, width, height);
      const resizedImage = await resizeImageToMatchMask(originalImageDataUrl, width, height);

      const response = await fetch("http://localhost:5001/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          version: "black-forest-labs/flux-fill-pro",
          input: {
            guidance: 90,
            mask: maskDataUrl,
            image: resizedImage,
            outpaint: "None",
            output_format: "jpg",
            prompt:`A close-up of a person’s body with the text "${textPrompt}" written on their skin using a black permanent marker. The ink appears naturally absorbed by the skin, with realistic smudging and slight fading in certain areas. The lettering is slightly irregular, with some strokes appearing darker and others lighter due to uneven pressure while writing. The text follows the natural curves and texture of the skin, stretching gracefully over contours and creases. The marker lines have gentle feathering, as if the ink is sinking into the pores. The overall effect is raw and authentic, captured in soft, natural lighting that highlights the skin's texture.`,
            prompt_upsampling: false,
            safety_tolerance: 6,
            steps: 50,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }
      const result = await response.json();
      setLoading(false);

      if (result && result.output) {
        setOutputImages(Array.isArray(result.output) ? result.output : [result.output]);
      } else {
        alert("Flux Fill did not return any outputs.");
      }
    } catch (err) {
      console.error("🔴 API Error:", err.message);
      setLoading(false);
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Left Sidebar */}
      <aside className={styles.leftSidebar}>
        <div className={styles.sidebarHeader}>
          <h2>influ.ai/ai-text-infill</h2>
          <p className={styles.sidebarSubtitle}>
            Multimodal diffusion-based AI text infill & synthesis
          </p>
        </div>

        <div className={styles.promptContainer}>
          <label className={styles.promptLabel}>Prompt</label>
          <input
            type="text"
            placeholder="Enter your text..."
            value={textPrompt}
            onChange={(e) => setTextPrompt(e.target.value)}
            className={styles.promptInput}
          />
        </div>

        <div className={styles.buttonGroup}>
          <label className={styles.uploadLabel}>
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className={styles.hiddenFileInput}
            />
          </label>
          <button onClick={applyFluxFillPro} className={styles.runButton}>
            Run
          </button>
        </div>

        <div className={styles.maskControls}>
          <button onClick={undoLastRectangle} className={styles.maskButton}>
            Undo Mask
          </button>
          <button onClick={clearCanvas} className={styles.maskButton}>
            Clear Mask
          </button>
        </div>
      </aside>

      {/* Main Canvas & Loading */}
      <main className={styles.mainContent}>
        <div ref={canvasWrapperRef} className={styles.canvasWrapper}>
          {loading && (
            <div className={styles.loadingOverlay}>
              <div className={styles.spinner}></div>
              <p className={styles.loadingText}>Generating Image...</p>
            </div>
          )}
          <canvas ref={canvasRef} className={styles.canvas} />
          {!originalImageDataUrl && !loading && (
            <div className={styles.canvasPlaceholder}>
              <p>Please upload an image to begin.</p>
            </div>
          )}
        </div>
      </main>

      {/* Right Sidebar for Results */}
      <aside className={styles.rightSidebar}>
        <h2 className={styles.resultsTitle}>Results</h2>
        {outputImages.length === 0 && (
          <div className={styles.noResults}>
            <p>No results yet. Run the model to see outputs here.</p>
          </div>
        )}
        {outputImages.length > 0 && (
          <div className={styles.resultsGallery}>
            {outputImages.map((imgUrl, index) => (
              <div key={index} className={styles.resultCard}>
                <div
                  className={styles.resultCardContent}
                  style={{ backgroundImage: `url(${imgUrl})` }}
                ></div>
                <div className={styles.resultOverlay}></div>
                <a href={imgUrl} download className={styles.downloadButton}>
                  <i className="fas fa-download"></i>
                </a>
              </div>
            ))}
          </div>
        )}
      </aside>
    </div>
  );
}

export default Dashboard;
