import { StatusBar } from 'expo-status-bar';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { styled } from 'nativewind';
import { useFonts, Roboto_400Regular as Roboto400Regular, Roboto_700Bold as Roboto700Bold } from '@expo-google-fonts/roboto';
import { BaiJamjuree_700Bold as BaiJamjuree700Bold } from '@expo-google-fonts/bai-jamjuree';

import blurBg from './src/assets/bg-blur.png';
import stripes from './src/assets/stripes.svg';
import Logo from './src/assets/logo.svg';

const StyledStripes = styled(stripes);

export default function App() {
  const [hasFontsLoaded] = useFonts({ Roboto400Regular, Roboto700Bold, BaiJamjuree700Bold });

  if (!hasFontsLoaded) {
    return null;
  }

  return (
    <ImageBackground
      source={blurBg}
      imageStyle={{ position: 'absolute', left: '-100%' }}
      className='relative flex-1 items-center bg-gray-900 px-8 py-10'
    >
      <StyledStripes className='absolute left-2'/>

      <View className='flex-1 items-center justify-center gap-6'>
        <Logo />

        <View className='space-y-2'>
          <Text className='text-center font-title text-2xl leading-tight text-gray-50'>
            Sua cápsula do tempo
          </Text>

          <Text className='text-center font-body text-base leading-relaxed text-gray-100'>
            Colecione momentos marcantes da sua jornada e compartilhe com o mundo!
          </Text>
        </View>

        <TouchableOpacity activeOpacity={0.7} className='rounded-full bg-green-500 px-5 py-2'>
          <Text className='font-alt text-sm uppercase text-black'>
            Cadastrar lembrança
          </Text>
        </TouchableOpacity>
      </View>

      <Text className='text-center font-body text-sm leading-relaxed text-gray-200'>
        Feito com 💜 no NLW da Rocketseat
      </Text>

      <StatusBar style='light' translucent/>
    </ImageBackground>
  );
}
