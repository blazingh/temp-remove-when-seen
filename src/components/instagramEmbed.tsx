"use client";
import { InstagramEmbed as InstaE } from 'react-social-media-embed';

export default function InstagramEmbed({ link }: { link: string }) {
  return (
    <InstaE
      retryDisabled
      url={link}
      igVersion='LATEST'
      width={'100%'}
      height={'100%'}
      aria-label="instagram-embed"
      aria-description='instagram-embed'
      style={{ borderRadius: '8px', border: 'solid 1px #DBD0F8' }}
      className='justify-center items-center flex'
    />
  );
}
