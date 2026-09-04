import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const MyVideo: React.FC = () => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	const opacity = interpolate(frame, [0, 30], [0, 1], {
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill style={{
			backgroundColor: 'white',
			justifyContent: 'center',
			alignItems: 'center',
			fontSize: '80px',
			fontWeight: 'bold',
			color: 'black'
		}}>
			<div style={{ opacity }}>
				Hello from the Cloud! 🚀
			</div>
		</AbsoluteFill>
	);
};
