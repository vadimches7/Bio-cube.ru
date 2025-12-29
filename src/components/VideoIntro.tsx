import { useState, useEffect, useRef } from "react";

/**
 * Видео-заставка с петушком и логотипом BioCube
 * Показывается при загрузке страницы, после окончания видео скрывается
 */
interface VideoIntroProps {
  onComplete?: () => void;
}

export function VideoIntro({ onComplete }: VideoIntroProps = {}) {
  const [isVisible, setIsVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // URL видео петушка (Betta Fish)
  // Используем локальное видео из /public/video/betta-intro.mp4
  // Измените версию (v=2) при замене видео файла, чтобы обойти кеш браузера
  const videoUrl = "/video/betta-intro.mp4?v=2";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Обработка окончания видео
    const handleVideoEnd = () => {
      setIsVisible(false);
      onComplete?.();
    };

    // Обработка ошибки загрузки видео
    const handleVideoError = () => {
      console.warn("Видео не загрузилось, скрываем заставку через 3 секунды");
      // После небольшой задержки скрываем заставку (3 секунды)
      setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 3000);
    };

    // Обработка успешного начала воспроизведения
    const handleCanPlay = () => {
      video.play().catch((err) => {
        console.warn("Автозапуск видео заблокирован:", err);
        // Если автозапуск заблокирован, скрываем через 3 секунды
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 3000);
      });
    };

    video.addEventListener("ended", handleVideoEnd);
    video.addEventListener("error", handleVideoError);
    video.addEventListener("canplay", handleCanPlay);

    // Попытка автозапуска
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("Автозапуск видео заблокирован:", err);
        // Если автозапуск заблокирован, скрываем через 3 секунды
        setTimeout(() => {
          setIsVisible(false);
          onComplete?.();
        }, 3000);
      });
    }

    return () => {
      video.removeEventListener("ended", handleVideoEnd);
      video.removeEventListener("error", handleVideoError);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  // Не скрываем компонент через return null, чтобы он всегда был в DOM
  // и полностью перекрывал контент, пока isVisible === true
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-[#020617] z-[9999]"
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999
      }}
    >
      {/* Видео петушка */}
      <video
        key={videoUrl}
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        preload="auto"
      >
        <source src={videoUrl} type="video/mp4" />
        {/* Fallback на изображение петушка, если видео не поддерживается */}
      </video>
      

    </div>
  );
}

