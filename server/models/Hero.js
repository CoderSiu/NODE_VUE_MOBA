const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  title: { //称号
    type: String
  },
  categories: [{ //英雄分类
    type: mongoose.SchemaTypes.ObjectId, ref: 'Category'
  }],
  score: { //评分
    difficult: { type: Number},
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number }
  },
  skill: [{ //技能
    icon: { type: String },
    name: { type: String },
    description: { type: String },
    tips: { type: String },
  }],
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }], //顺丰出装
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }], //逆风出装
  usageTips: { type: String },
  battleTips: { type: String },
  teamTips: { type: String },
  partners: { type: String },

})

module.exports = mongoose.model('Hero', schema)