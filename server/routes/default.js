import Router from 'express';

const router = Router();


router.use((req, res) => {
  const err = new Error(' not found please...');
  res.status(404).json({ status: 404, message: err.message });
});

export default router;