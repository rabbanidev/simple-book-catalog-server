import express from 'express';
import auth from '../../middlewares/auth';
import { ReadingListController } from './readingList.controller';

const router = express.Router();

router.post('/add', auth(), ReadingListController.addReadingList);
router.patch('/:id', auth(), ReadingListController.finishedReadingList);
router.delete('/:id', auth(), ReadingListController.deleteReadingList);
router.get('/', auth(), ReadingListController.getReadingList);

export const ReadingListRoutes = router;
