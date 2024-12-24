import type { MetaFunction } from "@remix-run/node";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Ved-prototype" },
    { name: "description", content: "Ved: Vim Editor - Cloud IDE." },
  ];
};

export default function Index() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<"normal" | "insert" | "command" | "visual">(
    "normal",
  );
  const [cursor, setCursor] = useState({ row: 0, col: 0 }); // Cursor position
  const [fontSize, setFontSize] = useState<number>(16);
  const [font, setSize] = useState<string>("monospace");
  const handleInsertMode = (key: string) => {
    console.log(key);
  };
  const handleCanvasKeyDown = (e) => {
    const key = e.key;
    if (mode == "normal" && key == "i") {
      setMode("insert");
    }
    if (mode == "insert") {
      handleInsertMode(key);
    }
  };
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.background = "black";
    ctx.font = `${fontSize}px ${font}`;
    ctx.fillStyle = "white";
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.addEventListener("keydown", handleCanvasKeyDown);
    canvas.focus();
    return () => {
      canvas.removeEventListener("keydown", handleCanvasKeyDown);
    };
  }, []);
  return <canvas ref={canvasRef}></canvas>;
}
