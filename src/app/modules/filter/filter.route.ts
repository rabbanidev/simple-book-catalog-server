import express from 'express';
import { FilterController } from './filter.controller';

const router = express.Router();

router.get('/books/genres', FilterController.getFilterByGenre);
router.get('/books/years', FilterController.getFilterByYear);

export const FilterRoutes = router;
