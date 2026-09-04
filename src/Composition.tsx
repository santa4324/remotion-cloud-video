import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
	spring
} from 'remotion';

// --- Styles ---
const COLORS = {
	bg: '#0a0a0f',
	primary: '#00d2ff',
	secondary: '#9d50bb',
	text: '#ffffff',
	danger: '#ff4d4d',
	success: '#00ff88'
};

const TEXT_STYLE: React.CSSProperties = {
	color: COLORS.text,
	fontFamily: 'Inter, system-ui, sans-serif',
	textAlign: 'center',
	fontWeight: 'bold',
};

// --- Components ---

const Scene: React.FC<{
	startFrame: number;
	endFrame: number;
	children: React.ReactNode
}> = ({ startFrame, endFrame, children }) => {
	const frame = useCurrentFrame();
	if (frame < startFrame || frame > endFrame) return null;
	return <AbsoluteFill>{children}</AbsoluteFill>;
};

const FadeInText: React.FC<{
	text: string;
	size?: number;
	color?: string;
	delay?: number;
}> = ({ text, size = 80, color = COLORS.text, delay = 0 }) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame - delay, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

	return (
		<div style={{
			...TEXT_STYLE,
			fontSize: size,
			color,
			opacity,
			transition: 'all 0.3s ease'
		}}>
			{text}
		</div>
	);
};

export const StackShieldVideo: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	return (
		<AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
			{/* Scene 1: The Vibe-Coding Hook (0-90 frames) */}
			<Scene startFrame={0} endFrame={90}>
				<AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
					<FadeInText text="You're shipping at light speed..." size={70} />
					<div style={{ height: 100 }} />
					<FadeInText text="But is your security keeping up?" size={60} color={COLORS.primary} delay={30} />
				</AbsoluteFill>
			</Scene>

			{/* Scene 2: The Pain Point (90-180 frames) */}
			<Scene startFrame={90} endFrame={180}>
				<AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#1a0a0a' }}>
					<div style={{
						display: 'flex',
						gap: '40px',
						opacity: interpolate(frame, [90, 110], [0, 1], { extrapolateRight: 'clamp' })
					}}>
						<div style={{ ...TEXT_STYLE, color: COLORS.danger, fontSize: 50 }}>⚠️ Leaked Keys</div>
						<div style={{ ...TEXT_STYLE, color: COLORS.danger, fontSize: 50 }}>⚠️ Broken RLS</div>
						<div style={{ ...TEXT_STYLE, color: COLORS.danger, fontSize: 50 }}>⚠️ Open CORS</div>
					</div>
					<div style={{ height: 100 }} />
					<FadeInText text="Stop guessing. Start securing." size={70} delay={120} />
				</AbsoluteFill>
			</Scene>

			{/* Scene 3: The Hero - StackShield (180-270 frames) */}
			<Scene startFrame={180} endFrame={270}>
				<AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
					<div style={{
						fontSize: 150,
						...TEXT_STYLE,
						color: COLORS.primary,
						transform: `scale(${spring({ frame: frame - 180, fps, config: { damping: 10 } })})`,
						opacity: interpolate(frame, [180, 200], [0, 1], { extrapolateRight: 'clamp' })
					}}>
						StackShield
					</div>
					<FadeInText text="Pre-launch security for vibe-coded apps" size={40} delay={210} />
				</AbsoluteFill>
			</Scene>

			{/* Scene 4: The Magic/Features (270-390 frames) */}
			<Scene startFrame={270} endFrame={390}>
				<AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
					<div style={{
						display: 'grid',
						gridTemplateColumns: '1fr',
						gap: '50px',
						width: '80%',
						opacity: interpolate(frame, [270, 290], [0, 1], { extrapolateRight: 'clamp' })
					}}>
						<div style={{ ...TEXT_STYLE, fontSize: 40, border: `2px solid ${COLORS.primary}`, padding: '20px', borderRadius: '15px' }}>
							Supabase RLS Audit
						</div>
						<div style={{ ...TEXT_STYLE, fontSize: 40, border: `2px solid ${COLORS.primary}`, padding: '20px', borderRadius: '15px' }}>
							GitHub Secrets Sweep
						</div>
						<div style={{ ...TEXT_STYLE, fontSize: 40, border: `2px solid ${COLORS.primary}`, padding: '20px', borderRadius: '15px' }}>
							Vercel Env Inspection
						</div>
					</div>
					<div style={{ height: 150 }} />
					<FadeInText text="One-click scans. Total visibility." size={60} delay={320} />
				</AbsoluteFill>
			</Scene>

			{/* Scene 5: The AI Fix (390-480 frames) */}
			<Scene startFrame={390} endFrame={480}>
				<AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
					<div style={{
						backgroundColor: '#161625',
						padding: '40px',
						borderRadius: '20px',
						border: `1px solid ${COLORS.secondary}`,
						opacity: interpolate(frame, [390, 410], [0, 1], { extrapolateRight: 'clamp' })
					}}>
						<div style={{ ...TEXT_STYLE, fontSize: 30, color: COLORS.secondary, marginBottom: '20px' }}>AI-Powered Remediation</div>
						<div style={{
							backgroundColor: '#000',
							padding: '20px',
							borderRadius: '10px',
							fontFamily: 'monospace',
							color: COLORS.success,
							fontSize: 24
						}}>
							{frame < 430 ? 'Analyzing vulnerability...' : '✅ Fix applied successfully!'}
						</div>
					</div>
					<div style={{ height: 100 }} />
					<FadeInText text="Fixed in seconds, not hours." size={60} delay={440} />
				</AbsoluteFill>
			</Scene>

			{/* Scene 6: Trust/Confidence (480-550 frames) */}
			<Scene startFrame={480} endFrame={550}>
				<AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
					<div style={{
						width: '300px',
						height: '300px',
						borderRadius: '50%',
						border: `10px solid ${COLORS.success}`,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						opacity: interpolate(frame, [480, 500], [0, 1], { extrapolateRight: 'clamp' })
					}}>
						<div style={{ ...TEXT_STYLE, fontSize: 50 }}>READY</div>
					</div>
					<div style={{ height: 100 }} />
					<FadeInText text="Ship with absolute confidence." size={70} delay={510} />
				</AbsoluteFill>
			</Scene>

			{/* Scene 7: CTA (550-600 frames) */}
			<Scene startFrame={550} endFrame={600}>
				<AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
					<div style={{ ...TEXT_STYLE, fontSize: 80, color: COLORS.primary }}>stackshield.org</div>
					<div style={{ height: 50 }} />
					<FadeInText text="Secure your stack today." size={40} delay={560} />
				</AbsoluteFill>
			</Scene>
		</AbsoluteFill>
	);
};
