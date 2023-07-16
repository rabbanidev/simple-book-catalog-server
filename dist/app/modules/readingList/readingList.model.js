"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const readinglistSchema = new mongoose_1.Schema({
    finshedReading: {
        type: Boolean,
        default: false,
    },
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const ReadingList = (0, mongoose_1.model)('ReadingList', readinglistSchema);
exports.default = ReadingList;
