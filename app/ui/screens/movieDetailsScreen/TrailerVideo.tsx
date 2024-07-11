import React, { useState } from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';
import Orientation from 'react-native-orientation-locker';
import { ActivityIndicator, StyleSheet, View, Dimensions } from 'react-native';

interface Props {
  videoId: string;
}

const TrailerVideo: React.FC<Props> = ({ videoId }) => {
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const screenWidth = Dimensions.get('window').width;

  const handleFullScreenChange = (isFullScreen: boolean) => {
    if (isFullScreen) {
      Orientation.lockToLandscape();
    } else {
      Orientation.lockToPortrait();
    }
  };

  return (
    <View style={styles.trailerContainer}>
      {isVideoLoading && <ActivityIndicator style={styles.spinner} color="#FF0000" />}
      <YoutubePlayer
        height={screenWidth * (9 / 16)}
        width={screenWidth - 40} 
        videoId={videoId}
        play={false}
        webViewProps={{
          allowsInlineMediaPlayback: true,
        }}
        initialPlayerParams={{
          preventFullScreen: false,
        }}
        onReady={() => setIsVideoLoading(false)}
        onFullScreenChange={handleFullScreenChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  trailerContainer: {
    marginVertical: 16,
    paddingHorizontal: 20, // Adding horizontal padding
    height: (Dimensions.get('window').width - 40) * (9 / 16), 
    justifyContent: 'center', 
  },
  spinner: {
    position: 'absolute',
    alignSelf: 'center',
  },
});

export default TrailerVideo;
