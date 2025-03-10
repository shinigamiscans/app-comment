<template>
  <div class="waline-container w-full bg-black text-white p-4 sm:p-6 rounded-lg">
    <Waline 
      :serverURL="serverURL" 
      :path="path"
      :lang="lang"
      :dark="dark"
      :locale="locale"
      :reaction="reaction"
      :emoji="emoji"
      :imageUploader="imageUploader"
    />
  </div>
</template>

<script setup>
import { Waline } from 'waline-client/component';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

import 'waline-client/waline.css';
import 'waline-client/waline-meta.css';

// Define configuration values as constants
const s3Client = new S3Client({
    region: process.env.VUE_APP_S3_REGION,
    endpoint: process.env.VUE_APP_S3_ENDPOINT,
    credentials: {
        accessKeyId: process.env.VUE_APP_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.VUE_APP_S3_SECRET_ACCESS_KEY,
    },
    forcePathStyle: true,
});

// Define the custom domain from environment variables
const customDomain = process.env.VUE_APP_CUSTOM_DOMAIN;

const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 10); // Generate a random 8-character string
};

const serverURL = 'https://komen-api.shngm.id';
const lang = 'en';
const path = computed(() => useRoute().query.id || '1'); // Dynamic path from query params
const dark = 'auto';

// Define custom locale settings (this is unchanged)
const locale = {
  nick: 'Nickname',
  nickError: 'Nickname tidak boleh kurang dari 3 digit.',
  mail: 'E-mail',
  mailError: 'Mohon konfirmasi alamat email kamu.',
  link: 'Website',
  optional: 'Opsional',
  placeholder: 'Komen di mari...',
  sofa: 'Belum ada komentar.',
  submit: 'Kirim',
  like: 'Suka',
  cancelLike: 'Batal suka',
  reply: 'Balas',
  cancelReply: 'Batal balas',
  comment: 'Komentar',
  refresh: 'Reload',
  more: 'Lebih Banyak...',
  preview: 'Pratinjau',
  emoji: 'Emoji',
  uploadImage: 'Unggah Gambar',
  now: 'baru saja',
  uploading: 'Mengupload, Tunggu...',
  login: 'Login',
  logout: 'Logout',
  admin: 'Admin',
  sticky: 'Sticky',
  word: 'Kata',
  wordHint: 'Silakan masukkan komentar antara $0 dan $1 kata!\n Jumlah kata saat ini: $2',
  anonymous: 'Anonim',
  level0: 'Villager',
  level1: 'Knight',
  level2: 'Earl',
  level3: 'Marquess',
  level4: 'Duke',
  level5: 'Archduke',
  gif: 'GIF',
  gifSearchPlaceholder: 'Cari GIF',
  profile: 'Profil',
  approved: 'Disetujui',
  waiting: 'Menunggu',
  spam: 'Spam',
  unsticky: 'Unsticky',
  oldest: 'Terlama',
  latest: 'Terbaru',
  hottest: 'Terpopuler',
  reactionTitle: 'Gimana Menurutmu?',
};

// Define reaction and emoji arrays (this is unchanged)
const reaction = [
  'https://cdn.discordapp.com/emojis/954256341944397864.webp',
  'https://cdn.discordapp.com/emojis/1029399978583539742.webp',
  'https://cdn.discordapp.com/emojis/1181987772618264606.webp',
  'https://cdn.discordapp.com/emojis/1073942886518890566.webp',
];

const emoji = [
  'https://cdn.jsdelivr.net/gh/sugarlessmuffins/pepemoji@1.0.1/',
  'https://cdn.jsdelivr.net/gh/sugarlessmuffins/papanmoji@v.0.0.1/',
];

// Define the imageUploader function (this is unchanged)
const imageUploader = async (file) => {
    const randomHash = generateRandomString();
    const fileExtension = file.name.split('.').pop(); // Extract the file extension
    
    const key = `comment/${randomHash}.${fileExtension}`;
    
    const uploadParams = {
        Bucket: 'backup', // Replace with your actual bucket name
        Key: key,
        Body: file, // Directly pass the file blob
        ACL: 'public-read', // Make it publicly readable
        ContentType: file.type, // Set the correct content type
    };

    try {
        const command = new PutObjectCommand(uploadParams);
        await s3Client.send(command);

        const fileUrl = `${customDomain}/${key}`;
        console.log('File uploaded successfully:', fileUrl);
        return fileUrl;
    } catch (err) {
        console.error('Image upload failed:', err);
        throw err;
    }
};
</script>

<style scoped>
/* Optional: Remove if Tailwind classes handle it */
</style>
