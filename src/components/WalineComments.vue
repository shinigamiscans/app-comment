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

import 'waline-client/waline.css';
import 'waline-client/waline-meta.css';

// Define configuration values as constants
const serverURL = 'https://komen-api.shngm.id';
const lang = 'en';
const path = computed(() => useRoute().query.id || '1'); // Dynamic path from query params
const dark = 'auto';

// Define custom locale settings
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
  seconds: 'detik yang lalu',
  minutes: 'menit yang lalu',
  hours: 'jam yang lalu',
  days: 'hari yang lalu',
  now: 'baru saja',
  uploading: 'Meng-upload',
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

// Define reaction and emoji arrays
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

// Define the image uploader function
const imageUploader = (file) => {
  let formData = new FormData();
  formData.append('file', file); // Adjust the field to 'file' instead of 'image'
  formData.append('apikey', 'b25dd90b02c52a7954402d62cff88193'); // BeeIMG API key

  return fetch('https://beeimg.com/api/upload/file/json/', {
    method: 'POST',
    body: formData,
  })
    .then((resp) => resp.json())
    .then((resp) => resp.files.url) // Adjust to extract 'url' from the 'files' object
    .catch((err) => {
      console.error('Image upload failed', err);
      throw err; // Handle errors
    });
};
</script>

<style scoped>
/* Optional: Remove if Tailwind classes handle it */
</style>
