"use client";

import React, { useCallback, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const messages = [
  "Hey, how's your day going?",
  "What are you working on?",
  "Did you eat something yet?",
  "I'll call you in a bit.",
  "That sounds really interesting to me.",
  "What do you think about it?",
  "Let's catch up sometime this week.",
  "I'm just taking a short break.",
  "Can you send that to me?",
  "See you again tomorrow morning.",
];

function NotePad() {
  const containerRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLSpanElement>(null);

  /*
   * Current position of the note.
   */
  const currentPos = useRef({
    x: 0,
    y: 0,
  });

  /*
   * Current message.
   */
  const currentMessageIndex = useRef(0);

  /*
   * Whether the mouse is currently considered
   * to be hovering the note.
   */
  const isHovering = useRef(false);

  /*
   * Timer used for repeated jumps.
   */
  const jumpTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /*
   * Prevent multiple jump animations from running
   * at the same time.
   */
  const isJumping = useRef(false);

  /*
   * Prevent component from starting multiple
   * hover loops.
   */
  const hoverLoopRunning = useRef(false);
  const jumpNoteRef = useRef<() => void>(() => {});
  const pointerPosition = useRef({ x: 0, y: 0 });

  useGSAP(
    () => {
      if (!noteRef.current) return;

      gsap.set(noteRef.current, {
        x: 0,
        y: 0,
        rotate: 0,
        scale: 1,
        transformOrigin: "center center",
        force3D: true,
      });
    },
    {
      scope: containerRef,
    },
  );

  /**
   * Clear the scheduled jump.
   */
  const clearJumpTimer = useCallback(() => {
    if (jumpTimer.current !== null) {
      clearTimeout(jumpTimer.current);
      jumpTimer.current = null;
    }
  }, []);

  /**
   * Get a random position inside the container.
   *
   * IMPORTANT:
   * We calculate the available space based on the
   * note's actual dimensions.
   */
  const getNextOffset = useCallback(() => {
    const container = containerRef.current;
    const note = noteRef.current;

    if (!container || !note) {
      return {
        x: 0,
        y: 0,
      };
    }

    const containerRect = container.getBoundingClientRect();

    const noteRect = note.getBoundingClientRect();

    /*
     * Calculate the maximum distance from the
     * center of the container.
     */
    const maxX = Math.max(0, (containerRect.width - noteRect.width) / 2 - 8);

    const maxY = Math.max(0, (containerRect.height - noteRect.height) / 2 - 8);

    const oldX = currentPos.current.x;
    const oldY = currentPos.current.y;

    /*
     * Minimum distance between old and new position.
     *
     * This prevents the note from making tiny
     * movements that look like it didn't jump.
     */
    const minDistance = Math.max(45, Math.min(maxX, maxY) * 0.45);

    let newX = oldX;
    let newY = oldY;

    /*
     * Try several times to find a position
     * sufficiently far from the current position.
     */
    for (let i = 0; i < 30; i++) {
      const candidateX = gsap.utils.random(-maxX, maxX);

      const candidateY = gsap.utils.random(-maxY, maxY);

      const distance = Math.hypot(candidateX - oldX, candidateY - oldY);

      if (distance >= minDistance || (maxX === 0 && maxY === 0)) {
        newX = candidateX;
        newY = candidateY;
        break;
      }

      /*
       * Last attempt.
       */
      if (i === 29) {
        newX = candidateX;
        newY = candidateY;
      }
    }

    return {
      x: newX,
      y: newY,
    };
  }, []);

  const isPointerOverNote = useCallback(() => {
    const note = noteRef.current;
    if (!note) return false;

    const rect = note.getBoundingClientRect();
    const { x, y } = pointerPosition.current;

    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  }, []);

  /**
   * Select a different message.
   */
  const getNextMessageIndex = useCallback(() => {
    if (messages.length <= 1) {
      return 0;
    }

    let nextIndex = currentMessageIndex.current;

    while (nextIndex === currentMessageIndex.current) {
      nextIndex = Math.floor(Math.random() * messages.length);
    }

    return nextIndex;
  }, []);

  /**
   * Change the note text.
   */
  const changeMessage = useCallback((nextIndex: number) => {
    const content = contentRef.current;

    if (!content) return;

    gsap.killTweensOf(content);

    gsap.to(content, {
      opacity: 0,
      y: -4,
      duration: 0.15,
      ease: "power1.out",
      overwrite: true,

      onComplete: () => {
        if (!contentRef.current) return;

        contentRef.current.textContent = messages[nextIndex];

        gsap.fromTo(
          contentRef.current,
          {
            opacity: 0,
            y: 4,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.25,
            ease: "power1.out",
            overwrite: true,
          },
        );
      },
    });
  }, []);

  /**
   * Perform ONE jump.
   */
  const jumpNote = useCallback(() => {
    const note = noteRef.current;

    if (!note) return;

    /*
     * Don't start another animation while the current
     * animation is running.
     */
    if (isJumping.current) {
      return;
    }

    isJumping.current = true;

    /*
     * Generate a genuinely different position.
     */
    const { x, y } = getNextOffset();

    currentPos.current = {
      x,
      y,
    };

    const randomRotation = gsap.utils.random(-6, 6);

    /*
     * Kill any previous movement.
     */
    gsap.killTweensOf(note);

    /*
     * Animate the note.
     */
    gsap.to(note, {
      x,
      y,
      rotate: randomRotation,
      scale: 1.03,

      duration: 1.05,

      ease: "power3.inOut",

      overwrite: true,

      onComplete: () => {
        isJumping.current = false;

        /*
         * THIS IS THE IMPORTANT PART.
         *
         * We do NOT wait for another mouse event.
         *
         * If the cursor is still considered hovering,
         * schedule another jump automatically.
         */
        if (isHovering.current && isPointerOverNote()) {
          jumpTimer.current = setTimeout(() => {
            jumpTimer.current = null;

            if (isHovering.current && isPointerOverNote()) {
              jumpNoteRef.current();
            } else {
              isHovering.current = false;
              hoverLoopRunning.current = false;
            }
          }, 320);
        } else {
          isHovering.current = false;
          hoverLoopRunning.current = false;
        }
      },
    });

    /*
     * Change text at the same time.
     */
    const nextMessageIndex = getNextMessageIndex();

    currentMessageIndex.current = nextMessageIndex;

    changeMessage(nextMessageIndex);
  }, [changeMessage, getNextMessageIndex, getNextOffset, isPointerOverNote]);

  React.useEffect(() => {
    jumpNoteRef.current = jumpNote;
  }, [jumpNote]);

  /**
   * Mouse leaves the note.
   */
  const handlePointerLeave = useCallback(() => {
    /*
     * Stop the hover loop.
     */
    isHovering.current = false;

    hoverLoopRunning.current = false;

    /*
     * Cancel the next scheduled jump.
     */
    clearJumpTimer();

    /*
     * Stop current movement.
     */
    if (noteRef.current) {
      gsap.killTweensOf(noteRef.current);

      gsap.to(noteRef.current, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
        overwrite: true,
      });
    }

    /*
     * Reset jumping state.
     */
    isJumping.current = false;
  }, [clearJumpTimer]);

  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      pointerPosition.current = {
        x: event.clientX,
        y: event.clientY,
      };

      if (!isPointerOverNote()) {
        if (isHovering.current) handlePointerLeave();
        return;
      }

      isHovering.current = true;

      if (hoverLoopRunning.current) return;

      hoverLoopRunning.current = true;
      clearJumpTimer();
      jumpNoteRef.current();
    },
    [clearJumpTimer, handlePointerLeave, isPointerOverNote],
  );

  /*
   * Cleanup when component unmounts.
   */
  React.useEffect(() => {
    return () => {
      isHovering.current = false;
      hoverLoopRunning.current = false;
      isJumping.current = false;

      clearJumpTimer();

      if (noteRef.current) {
        gsap.killTweensOf(noteRef.current);
      }

      if (contentRef.current) {
        gsap.killTweensOf(contentRef.current);
      }
    };
  }, [clearJumpTimer]);

  return (
    <div
      ref={containerRef}
      className="
        relative
        z-20
        flex
        min-h-[176px]
        items-center
        justify-center
        overflow-hidden
        px-4
        pb-8
        pt-3
        md:min-h-[196px]
        lg:min-h-[216px]
      "
      onPointerEnter={handlePointerMove}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div
        ref={noteRef}
        className="
          relative
          w-[112px]
          cursor-pointer
          select-none
          will-change-transform
          sm:w-[124px]
          lg:w-[136px]
        "
      >
        {/* NOTE IMAGE */}
        <Image
          src="/images/note.png"
          width={136.7}
          height={136.7}
          alt="Notepad image"
          draggable={false}
          className="
            pointer-events-none
            h-auto
            w-full
            object-cover
          "
        />

        {/* PIN */}
        <div
          className="
            pointer-events-none
            absolute
            right-[9%]
            top-0
            w-[17%]
          "
        >
          <Image
            src="/images/pin.png"
            width={23}
            height={32}
            alt="Pin image"
            draggable={false}
            className="
              h-auto
              w-full
              object-cover
            "
          />
        </div>

        {/* MESSAGE */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            flex
            items-center
            justify-center
            px-3
          "
        >
          <span
            ref={contentRef}
            className="
              text-center
              text-[10px]
              font-medium
              leading-snug
              text-neutral-700
              sm:text-xs
            "
          >
            Hey, how&apos;s your day going?
          </span>
        </div>
      </div>
    </div>
  );
}

export default NotePad;
