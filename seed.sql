-- 山マスタデータ（日本百名山より抜粋）
INSERT OR IGNORE INTO mountains (id, name, name_kana, elevation, prefecture, region, latitude, longitude, category, difficulty, description) VALUES
('mt_fuji', '富士山', 'ふじさん', 3776, '静岡県・山梨県', '中部', 35.3606, 138.7274, 'hyakumei', 'medium', '日本最高峰。世界文化遺産にも登録された日本の象徴。'),
('mt_kita', '北岳', 'きただけ', 3193, '山梨県', '中部', 35.6747, 138.2388, 'hyakumei', 'hard', '日本第二位の高峰。南アルプス最高峰。'),
('mt_okuhotaka', '奥穂高岳', 'おくほたかだけ', 3190, '長野県・岐阜県', '中部', 36.2888, 137.6488, 'hyakumei', 'expert', '北アルプスの最高峰。穂高連峰の主峰。'),
('mt_yari', '槍ヶ岳', 'やりがたけ', 3180, '長野県・岐阜県', '中部', 36.3425, 137.6478, 'hyakumei', 'expert', '日本を代表する山。ピラミダルな山頂が特徴。'),
('mt_akadake', '赤岳', 'あかだけ', 2899, '長野県・山梨県', '中部', 35.9692, 138.3708, 'hyakumei', 'hard', '八ヶ岳連峰の最高峰。360度の展望が魅力。'),
('mt_tateyama', '立山', 'たてやま', 3015, '富山県', '中部', 36.5736, 137.6181, 'hyakumei', 'medium', '立山連峰の主峰。雄山・大汝山・富士ノ折立の三峰からなる。'),
('mt_shirane', '白根山', 'しらねさん', 2578, '群馬県', '関東', 36.6256, 138.5527, 'hyakumei', 'medium', '日光白根山。関東以北の最高峰。'),
('mt_nantai', '男体山', 'なんたいさん', 2486, '栃木県', '関東', 36.7708, 139.4928, 'hyakumei', 'medium', '日光の霊峰。中禅寺湖を望む日光連山の主峰。'),
('mt_kumotori', '雲取山', 'くもとりやま', 2017, '東京都・埼玉県・山梨県', '関東', 35.8544, 138.9386, 'hyakumei', 'medium', '東京都最高峰。奥多摩の最深部に位置する。'),
('mt_tanzawa', '丹沢山', 'たんざわさん', 1567, '神奈川県', '関東', 35.4756, 139.1561, 'hyakumei', 'medium', '首都圏から近い人気の山塊。ブナ林が美しい。'),
('mt_takao', '高尾山', 'たかおさん', 599, '東京都', '関東', 35.6254, 139.2432, 'other', 'easy', '年間登山者数世界一。多彩なコースと豊かな自然が魅力。'),
('mt_tsukuba', '筑波山', 'つくばさん', 877, '茨城県', '関東', 36.2254, 140.1067, 'hyakumei', 'easy', '「西の富士、東の筑波」と称される名山。'),
('mt_myoko', '妙高山', 'みょうこうさん', 2454, '新潟県', '中部', 36.8972, 138.1117, 'hyakumei', 'hard', '越後の名山。火山地形が特徴的。'),
('mt_hakusan', '白山', 'はくさん', 2702, '石川県・岐阜県', '中部', 36.1542, 136.7717, 'hyakumei', 'medium', '霊峰白山。高山植物の宝庫。'),
('mt_norikura', '乗鞍岳', 'のりくらだけ', 3026, '長野県・岐阜県', '中部', 36.1058, 137.5528, 'hyakumei', 'easy', '畳平まで車でアクセス可能。初心者にも人気。');

-- バッジ定義
INSERT OR IGNORE INTO badges (id, name, description, icon, condition_type, condition_value, rarity) VALUES
('badge_first', 'ファーストサミット', '初めての登頂記録', '🏔️', 'mountain_count', '1', 'common'),
('badge_5peaks', 'ファイブピークス', '5山に登頂', '⛰️', 'mountain_count', '5', 'common'),
('badge_10peaks', 'テンピークス', '10山に登頂', '🗻', 'mountain_count', '10', 'rare'),
('badge_25peaks', 'クォーターセンチュリー', '25山に登頂', '🌟', 'mountain_count', '25', 'rare'),
('badge_50peaks', 'ハーフセンチュリー', '50山に登頂', '💫', 'mountain_count', '50', 'epic'),
('badge_100peaks', 'ヒャクメイ', '100山に登頂（日本百名山制覇！）', '👑', 'mountain_count', '100', 'legendary'),
('badge_fuji', '富士登頂', '富士山に登頂', '🗻', 'specific_mountain', 'mt_fuji', 'rare'),
('badge_3000', '3000m超え', '標高3000m超の山に登頂', '❄️', 'elevation_mountain', '3000', 'rare'),
('badge_elevation_10000', '累積標高10000m', '累積獲得標高10000mを達成', '📈', 'elevation_total', '10000', 'epic'),
('badge_elevation_50000', '累積標高50000m', '累積獲得標高50000mを達成（エベレスト超え！）', '🏆', 'elevation_total', '50000', 'legendary'),
('badge_social_10', 'コミュニティ参加', '10人にフォローされる', '👥', 'followers', '10', 'common'),
('badge_photo', 'フォトグラファー', '50枚の写真を投稿', '📸', 'photo_count', '50', 'common');
