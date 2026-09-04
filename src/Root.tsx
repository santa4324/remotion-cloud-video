import React from 'react';
import { Composition } from 'remotion';
import { StackShieldVideo } from './Composition';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="StackShieldVideo"
				component={StackShieldVideo}
				durationInFrames={600}
				fps={30}
				width={1920}
				height={1080}
			/>
		</>
	);
};
