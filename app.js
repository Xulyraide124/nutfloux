const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 8080;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'videoFile') cb(null, 'uploads/');
    else if (file.fieldname === 'thumbnail') cb(null, 'thumbnails/');
    else cb(new Error('Champ de fichier inconnu'), null);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    const basename = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, basename + ext);
  }
});

function fileFilter(req, file, cb) {
  if (file.fieldname === 'videoFile') {
    if (file.mimetype === 'video/mp4') cb(null, true);
    else cb(new Error('Seules les vidéos MP4 sont autorisées'), false);
  } else if (file.fieldname === 'thumbnail') {
    if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) cb(null, true);
    else cb(new Error('Miniature doit être une image JPG ou PNG'), false);
  } else {
    cb(new Error('Type de fichier inconnu'), false);
  }
}

const upload = multer({ storage, fileFilter });

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/thumbnails', express.static(path.join(__dirname, 'thumbnails')));
app.use(express.urlencoded({ extended: true }));

const VIDEOS_JSON = path.join(__dirname, 'videos.json');

function loadVideos() {
  if (!fs.existsSync(VIDEOS_JSON)) return [];
  try {
    const data = fs.readFileSync(VIDEOS_JSON, 'utf-8');
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Erreur de lecture videos.json:', err);
    return [];
  }
}

function saveVideos(videos) {
  fs.writeFileSync(VIDEOS_JSON, JSON.stringify(videos, null, 2));
}

// Page d'accueil
app.get('/', (req, res) => {
  res.render('index', { error: req.query.error });
});

app.post('/upload', upload.fields([
  { name: 'videoFile', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]), (req, res) => {
  const videoFile = req.files['videoFile'] ? req.files['videoFile'][0] : null;
  const thumbnailFile = req.files['thumbnail'] ? req.files['thumbnail'][0] : null;
  const { videoTitle } = req.body;

  if (!videoFile) {
    return res.redirect('/?error=' + encodeURIComponent('Aucune vidéo téléchargée'));
  }

  const videos = loadVideos();
  const thumbnailName = thumbnailFile ? thumbnailFile.filename : null;

  videos.push({
    filename: videoFile.filename,
    title: videoTitle,
    uploadedAt: new Date().toISOString(),
    thumbnail: thumbnailName,
  });

  saveVideos(videos);
  res.redirect('/videos');
});

app.get('/videos', (req, res) => {
  let { search = '', order = 'desc' } = req.query;
  const videos = loadVideos();

  let filtered = videos.filter(v =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  filtered.sort((a, b) => {
    return order === 'asc'
      ? new Date(a.uploadedAt) - new Date(b.uploadedAt)
      : new Date(b.uploadedAt) - new Date(a.uploadedAt);
  });

  res.render('videos', { videos: filtered, search, order });
});

// Suppression d'une vidéo
app.post('/delete/:filename', (req, res) => {
  const { filename } = req.params;
  let videos = loadVideos();

  const index = videos.findIndex(v => v.filename === filename);
  if (index === -1) {
    return res.redirect('/videos?error=' + encodeURIComponent('Vidéo non trouvée'));
  }

  const video = videos[index];

  const videoPath = path.join(__dirname, 'uploads', filename);
  if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);

  if (video.thumbnail) {
    const thumbPath = path.join(__dirname, 'thumbnails', video.thumbnail);
    if (fs.existsSync(thumbPath)) fs.unlinkSync(thumbPath);
  }

  videos.splice(index, 1);
  saveVideos(videos);
  res.redirect('/videos');
});

app.get('/player/:filename', (req, res) => {
  const { filename } = req.params;
  const videos = loadVideos();
  const video = videos.find(v => v.filename === filename);

  if (!video) return res.status(404).send('Vidéo non trouvée');
  res.render('player', { video });
});

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message) {
    return res.redirect('/?error=' + encodeURIComponent(err.message));
  }
  next(err);
});

// Lancement serveur
app.listen(PORT, () => {
  console.log(`Mini-Netflix démarré sur http://localhost:${PORT}`);
});
