import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
	spring,
} from 'remotion';

// --- Constants & Theme ---
const COLORS = {
	bg: '#050508',
	primary: '#00d2ff',
	secondary: '#9d50bb',
	accent: '#00ff88',
	text: '#ffffff',
	glass: 'rgba(255, 255, 255, 0.05)',
	glassBorder: 'rgba(255, 255, 255, 0.1)',
};

const TEXT_STYLE: React.CSSProperties = {
	color: COLORS.text,
	fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, sans-serif',
	textAlign: 'center',
	fontWeight: 'bold',
};

// --- Premium Components ---

const MeshBackground: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const move1 = spring({ frame, fps, config: { damping: 20 } });
	const move2 = spring({ frame: frame * 0.8, fps, config: { damping: 25 } });

	return (
		<AbsoluteFill style={{ backgroundColor: COLORS.bg, overflow: 'hidden' }}>
			<div
				style={{
					position: 'absolute',
					width: '150%',
					height: '150%',
					top: '-25%',
					left: '-25%',
					background: `radial-gradient(circle at ${50 + move1 * 20}% ${50 + move2 * 20}%, ${COLORS.primary}44 0%, transparent 50%),
								radial-gradient(circle at ${20 - move2 * 10}% ${80 + move1 * 10}%, ${COLORS.secondary}33 0%, transparent 50%)`,
					filter: 'blur(80px)',
					zIndex: -1,
				}}
			/>
		</AbsoluteFill>
	);
};

const GlassCard: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
	<div
		style={{
			backgroundColor: COLORS.glass,
			backdropFilter: 'blur(12px)',
			border: `1px solid ${COLORS.glassBorder}`,
			borderRadius: '24px',
			padding: '30px',
			boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
			...style,
		}}
	>
		{children}
	</div>
);

const TypingText: React.FC<{ text: string; delay?: number; speed?: number; color?: string; size?: number }> = ({
	text,
	delay = 0,
	speed = 2,
	color = COLORS.text,
	size = 40,
}) => {
	const frame = useCurrentFrame();
	const currentText = text.slice(0, Math.max(0, Math.floor((frame - delay) / speed)));

	return (
		<div style={{ ...TEXT_STYLE, fontSize: size, color, fontFamily: 'monospace' }}>
			{currentText}
			<span style={{ opacity: (frame - delay) % (speed * 2) === 0 ? 1 : 0 }}>|</span>
		</div>
	);
};

const Scene: React.FC<{ startFrame: number; endFrame: number; children: React.ReactNode }> = ({
	startFrame,
	endFrame,
	children,
}) => {
	const frame = useCurrentFrame();
	if (frame < startFrame || frame > endFrame) return null;

	const opacity = interpolate(frame - startFrame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
	const scale = interpolate(frame - startFrame, [0, 15], [0.95, 1], { extrapolateRight: 'clamp' });

	return (
		<AbsoluteFill style={{ opacity, transform: `scale(${scale})`, justifyContent: 'center', alignItems: 'center' }}>
			{children}
		</AbsoluteFill>
	);
};

// --- Main Video ---

export const StackShieldVideo: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	// Assets from the provided folder
	const scanImages = [
		'/assets/Image 04-09-2026 at 5.16 PM.png',
		'/assets/Image 04-09-2026 at 5.17 PM.png',
		'/assets/Image 04-09-2026 at 5.17 PM (1).png',
		'/assets/Image 04-09-2026 at 5.17 PM (2).png',
		'/assets/Image 04-09-2026 at 5.17 PM (3).png',
		'/assets/Image 04-09-2026 at 5.25 PM.png',
		'/assets/Image 04-09-2026 at 5.26 PM.png',
		'/assets/Image 04-09-2026 at 5.27 PM.png',
		'/assets/Image 04-09-2026 at 5.28 PM.png',
		'/assets/Image 04-09-2026 at 5.29 PM.png',
	];

	return (
		<AbsoluteFill style={{ backgroundColor: COLORS.bg }}>
			<MeshBackground />

			{/* Scene 1: Hook */}
			<Scene startFrame={0} endFrame={90}>
				<div style={{ textAlign: 'center' }}>
					<h1 style={{ ...TEXT_STYLE, fontSize: 80, marginBottom: 20 }}>Shipping at light speed?</h1>
					<p style={{ ...TEXT_STYLE, fontSize: 40, color: COLORS.primary }}>Is your security keeping up?</p>
				</div>
			</Scene>

			{/* Scene 2: Problem */}
			<Scene startFrame={90} endFrame={180}>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 30, width: '80%' }}>
					{['Leaked Keys', 'Broken RLS', 'Open CORS'].map((text, i) => (
						<GlassCard
							key={text}
							style={{
								opacity: interpolate(frame, [90 + i * 15, 90 + i * 15 + 15], [0, 1], { extrapolateRight: 'clamp' }),
								transform: `translateY(${interpolate(frame, [90 + i * 15, 90 + i * 15 + 15], [20, 0], { extrapolateRight: 'clamp' })}px)`,
								borderLeft: `8px solid ${COLORS.danger}`,
							}}
						>
							<div style={{ ...TEXT_STYLE, fontSize: 40, color: COLORS.danger }}>⚠️ {text}</div>
						</GlassCard>
					))}
				</div>
			</Scene>

			{/* Scene 3: Solution */}
			<Scene startFrame={180} endFrame={270}>
				<div style={{ textAlign: 'center' }}>
					<div
						style={{
							fontSize: 160,
							...TEXT_STYLE,
							color: COLORS.primary,
							transform: `scale(${spring({ frame: frame - 180, fps, config: { damping: 12 } })})`,
						}}
					>
						StackShield
					</div>
					<p style={{ ...TEXT_STYLE, fontSize: 40, opacity: interpolate(frame, [210, 230], [0, 1], { extrapolateRight: 'clamp' }) }}>
						Pre-launch security for vibe-coded apps
					</p>
				</div>
			</Scene>

			{/* Scene 4: The User Flow - Claude Code Interaction */}
			<Scene startFrame={270} endFrame={450}>
				<div
					style={{
						width: '90%',
						transform: `scale(${interpolate(frame, [320, 380], [1, 1.4], { extrapolateRight: 'clamp' })})`,
						transition: 'transform 0.1s linear',
					}}
				>
					<GlassCard style={{ backgroundColor: '#000', border: `1px solid ${COLORS.primary}44` }}>
						<div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
							<div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ff5f56' }} />
							<div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
							<div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#27c93f' }} />
						</div>
						<div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
							<div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
								<span style={{ color: COLORS.primary, fontFamily: 'monospace', fontWeight: 'bold' }}>➜</span>
								<TypingText text="scan my project connected to StackShield" delay={280} speed={2} size={30} />
							</div>
							<div
								style={{
									opacity: interpolate(frame, [360, 380], [0, 1], { extrapolateRight: 'clamp' }),
									color: COLORS.accent,
									fontFamily: 'monospace',
									fontSize: 24,
								}}
							>
								Executing MCP Tool: stackshield_scan...
							</div>
						</div>
					</GlassCard>
				</div>

				{/* Transition to Results */}
				<div
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						opacity: interpolate(frame, [390, 410], [0, 1], { extrapolateRight: 'clamp' }),
						pointerEvents: 'none',
						zIndex: 10,
						justifyContent: 'center',
						alignItems: 'center',
						display: 'flex',
					}}
				>
					<div
						style={{
							width: '80%',
							height: '60%',
							position: 'relative',
							transform: `scale(${interpolate(frame, [390, 420], [0.8, 1], { extrapolateRight: 'clamp' })})`,
						}}
					>
						{scanImages.map((img, i) => (
							<img
								key={img}
								src={img}
								style={{
									position: 'absolute',
									width: '100%',
									height: '100%',
									objectFit: 'contain',
									opacity: interpolate(frame, [410 + i * 10, 410 + i * 10 + 10], [0, 1], { extrapolateRight: 'clamp' }),
									filter: 'drop-shadow(0 0 20px rgba(0, 210, 255, 0.3))',
								}}
								alt={`Scan Result ${i}`}
							/>
						))}
					</div>
				</div>
			</Scene>

			{/* Scene 5: AI Remediation */}
			<Scene startFrame={450} endFrame={540}>
				<GlassCard style={{ width: '80%', borderLeft: `8px solid ${COLORS.secondary}` }}>
					<div style={{ ...TEXT_STYLE, fontSize: 30, color: COLORS.secondary, marginBottom: 20 }}>
						AI-Powered Remediation
					</div>
					<div
						style={{
							backgroundColor: '#000',
							padding: '20px',
							borderRadius: '12px',
							fontFamily: 'monospace',
							color: COLORS.accent,
							fontSize: 20,
							textAlign: 'left',
						}}
					>
						<TypingText text="Analyzing vulnerability..." delay={460} speed={3} size={20} />
						<div style={{ opacity: interpolate(frame, [490, 510], [0, 1], { extrapolateRight: 'clamp' }) }}>
							<div style={{ marginTop: 10 }}>✅ Fixed: Supabase RLS policy updated.</div>
							<div style={{ marginTop: 5 }}>✅ Fixed: Vercel env variable secured.</div>
						</div>
					</div>
				</GlassCard>
			</Scene>

			{/* Scene 6: CTA */}
			<Scene startFrame={540} endFrame={600}>
				<div style={{ textAlign: 'center' }}>
					<div
						style={{
							fontSize: 100,
							...TEXT_STYLE,
							color: COLORS.primary,
							transform: `scale(${spring({ frame: frame - 540, fps, config: { damping: 10 } })})`,
						}}
					>
						stackshield.org
					</div>
					<p style={{ ...TEXT_STYLE, fontSize: 40, opacity: interpolate(frame, [560, 580], [0, 1], { extrapolateRight: 'clamp' }) }}>
						Secure your stack today.
					</p>
				</div>
			</Scene>
		</AbsoluteFill>
	);
};
