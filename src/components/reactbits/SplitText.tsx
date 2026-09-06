import { motion } from 'framer-motion';

interface SplitTextProps {
  text: string;
  className?: string;
  splitType?: 'chars' | 'words';
  delay?: number;
  duration?: number;
  as?: 'p' | 'h1' | 'h2' | 'h3' | 'span';
}

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * reactbits-style SplitText — reveals text char-by-char or word-by-word
 * as it scrolls into view. https://reactbits.dev/text-animations/split-text
 */
export default function SplitText({
  text,
  className = '',
  splitType = 'words',
  delay = 0.04,
  duration = 0.5,
  as: Tag = 'p',
}: SplitTextProps) {
  const pieces = splitType === 'chars' ? Array.from(text) : text.split(' ');

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      className={className}
    >
      {pieces.map((piece, i) => (
        <span
          key={`${i}-${piece}`}
          className="inline-block overflow-hidden align-bottom"
          style={{
            marginRight: splitType === 'words' ? '0.28em' : undefined,
            paddingBottom: '0.2em',
          }}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: '110%', opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { duration, ease, delay: i * delay },
              },
            }}
          >
            {piece === ' ' ? '\u00A0' : piece}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
