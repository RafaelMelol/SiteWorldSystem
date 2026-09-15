"use client";

import { useEffect, useRef } from "react";

// Só desktop: exige ponteiro fino com hover (descarta touch) e largura
// suficiente — sem o min-width o efeito aparece no layout mobile quando é
// só a janela do desktop que está estreita.
const QUERY = "(hover: hover) and (pointer: fine) and (min-width: 768px)";

/**
 * Troca o ponteiro do sistema por um círculo que inverte a cor de baixo
 * (mix-blend-mode: difference). Escuta mudanças na media query, então
 * redimensionar a janela liga/desliga o efeito na hora. Sem JS o cursor
 * normal continua, já que o `cursor: none` só é aplicado por este efeito.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(QUERY);
    let frameId = 0;

    // Fator alto de propósito: o círculo praticamente cola no ponteiro.
    // Valores baixos davam a impressão de atraso/travamento.
    function animate() {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.6;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.6;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${currentPos.current.x}px, ${currentPos.current.y}px) translate(-50%, -50%)`;
      }
      frameId = requestAnimationFrame(animate);
    }

    function handleMouseMove(event: MouseEvent) {
      targetPos.current = { x: event.clientX, y: event.clientY };
      if (!hasMoved.current) {
        hasMoved.current = true;
        currentPos.current = { x: event.clientX, y: event.clientY };
        dotRef.current?.classList.add("is-visible");
      }
    }

    function handleMouseLeave() {
      dotRef.current?.classList.remove("is-visible");
    }

    function handleMouseEnter() {
      if (hasMoved.current) dotRef.current?.classList.add("is-visible");
    }

    function enable() {
      document.documentElement.classList.add("custom-cursor-active");
      frameId = requestAnimationFrame(animate);
      window.addEventListener("mousemove", handleMouseMove);
      document.documentElement.addEventListener("mouseleave", handleMouseLeave);
      document.documentElement.addEventListener("mouseenter", handleMouseEnter);
    }

    function disable() {
      document.documentElement.classList.remove("custom-cursor-active");
      cancelAnimationFrame(frameId);
      hasMoved.current = false;
      dotRef.current?.classList.remove("is-visible");
      window.removeEventListener("mousemove", handleMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
    }

    function handleQueryChange(event: MediaQueryListEvent) {
      if (event.matches) enable();
      else disable();
    }

    if (mediaQuery.matches) enable();
    mediaQuery.addEventListener("change", handleQueryChange);

    return () => {
      disable();
      mediaQuery.removeEventListener("change", handleQueryChange);
    };
  }, []);

  return <div ref={dotRef} aria-hidden className="custom-cursor" />;
}
