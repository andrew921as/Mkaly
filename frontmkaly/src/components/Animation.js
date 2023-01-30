import { useRef, useEffect, useState } from 'react';
import { motion } from "framer-motion";

export default function Animation({children}) {
	const outerRef = useRef(null);
	const [inViewport, setInViewport] = useState(true);
	useEffect(() => {
		const onChange = entries => {
			entries.forEach(entry => {
				if (entry.target === outerRef.current) {
					if (entry.isIntersecting) {
						setInViewport(true);
					} else {
						setInViewport(false);
					}
				}
			});
		};
		const observer = new IntersectionObserver(onChange, { threshold: 0.5 });
		observer.observe(outerRef.current);
	}, [outerRef]);

	// Framer motion animations
	const fadeInContainerWithStagger = {
		hidden: {
			opacity: 0
		},
		visible: {
			opacity: 1,
			transition: {
				duration: 0.5,
				type: "tween",
				ease: "easeIn",
				when: "beforeChildren",
				staggerChildren: 0.1
			}
		}
	};

	const fadeInUp = {
		hidden: {
			opacity: 0,
			y: 40
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring"
			}
		}
	};
	return (
		<div ref={outerRef} id="outer-box">
			<motion.div
				variants={fadeInContainerWithStagger}
				initial="hidden"
				whileInView="visible"
			>
				  {children}
			</motion.div>
		</div>
	)
}