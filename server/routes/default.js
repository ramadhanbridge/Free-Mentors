import Router from 'express';

const router = Router();


router.use((req, res) => {
  const err = new Error(' Not found please...');
  res.status(405).json({ status: 405, message: err.message });
});

export default router;
