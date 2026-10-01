import { FoodItem } from '../types/nutrition';

export const PRESET_FOODS: FoodItem[] = [
  // ==========================================
  // 브랜드 즉석밥 & 간편식 (햇반, 오뚜기밥 등)
  // ==========================================
  { id: 'hetbahn-white', name: 'CJ 햇반 백미 (210g)', category: 'rice', servingSize: '1개 (210g)', servingGrams: 210, calories: 315, carbs: 70, protein: 5, fat: 1.5 },
  { id: 'hetbahn-small', name: 'CJ 햇반 작은공기 (130g)', category: 'rice', servingSize: '1개 (130g)', servingGrams: 130, calories: 190, carbs: 43, protein: 3, fat: 0.9 },
  { id: 'hetbahn-large', name: 'CJ 햇반 큰공기 (300g)', category: 'rice', servingSize: '1개 (300g)', servingGrams: 300, calories: 450, carbs: 100, protein: 7, fat: 2 },
  { id: 'hetbahn-brown', name: 'CJ 햇반 발아현미밥 (210g)', category: 'rice', servingSize: '1개 (210g)', servingGrams: 210, calories: 315, carbs: 67, protein: 6, fat: 2.3 },
  { id: 'hetbahn-black', name: 'CJ 햇반 흑미밥 (210g)', category: 'rice', servingSize: '1개 (210g)', servingGrams: 210, calories: 310, carbs: 68, protein: 6, fat: 1.6 },
  { id: 'hetbahn-mixed', name: 'CJ 햇반 매일잡곡밥 (210g)', category: 'rice', servingSize: '1개 (210g)', servingGrams: 210, calories: 305, carbs: 65, protein: 7, fat: 2 },
  { id: 'hetbahn-chicken-fried', name: 'CJ 햇반 닭가슴살 볶음밥', category: 'rice', servingSize: '1팩 (220g)', servingGrams: 220, calories: 365, carbs: 60, protein: 16, fat: 7 },
  { id: 'ottogi-rice-white', name: '오뚜기 맛있는 오뚜기밥 (210g)', category: 'rice', servingSize: '1개 (210g)', servingGrams: 210, calories: 305, carbs: 69, protein: 5, fat: 1.2 },
  { id: 'ottogi-rice-small', name: '오뚜기 맛있는 오뚜기밥 작은밥 (130g)', category: 'rice', servingSize: '1개 (130g)', servingGrams: 130, calories: 190, carbs: 43, protein: 3, fat: 0.7 },
  { id: 'the-mishik-rice', name: '더미식 백미밥 (210g)', category: 'rice', servingSize: '1개 (210g)', servingGrams: 210, calories: 310, carbs: 70, protein: 5, fat: 1 },

  // 일반 밥 및 주식류 (Grains & Staples)
  { id: 'rice-white-bowl', name: '백미 쌀밥 (일반 식당/집밥)', category: 'rice', servingSize: '1공기 (210g)', servingGrams: 210, calories: 310, carbs: 69, protein: 6, fat: 0.7 },
  { id: 'rice-brown-bowl', name: '현미잡곡밥 (집밥)', category: 'rice', servingSize: '1공기 (210g)', servingGrams: 210, calories: 330, carbs: 70, protein: 7.2, fat: 2.1 },
  { id: 'rice-konjac', name: '곤약 현미밥', category: 'rice', servingSize: '1팩 (150g)', servingGrams: 150, calories: 145, carbs: 32, protein: 3.2, fat: 0.5 },
  { id: 'sweet-potato', name: '고구마 (찐것)', category: 'rice', servingSize: '1개 중간 (150g)', servingGrams: 150, calories: 195, carbs: 45, protein: 2.1, fat: 0.3 },
  { id: 'potato-steamed', name: '감자 (삶은것)', category: 'rice', servingSize: '1개 중간 (130g)', servingGrams: 130, calories: 110, carbs: 24, protein: 2.5, fat: 0.2 },
  { id: 'oatmeal', name: '오트밀 (귀리)', category: 'rice', servingSize: '1회 (40g)', servingGrams: 40, calories: 155, carbs: 27, protein: 5.5, fat: 2.8 },
  { id: 'bread-wholewheat', name: '통밀 식빵', category: 'rice', servingSize: '2쪽 (70g)', servingGrams: 70, calories: 180, carbs: 33, protein: 8, fat: 2 },
  { id: 'bread-bagel', name: '플레인 베이글', category: 'rice', servingSize: '1개 (100g)', servingGrams: 100, calories: 270, carbs: 54, protein: 10, fat: 1.5 },
  { id: 'samgak-tuna', name: '삼각김밥 참치마요 (편의점)', category: 'rice', servingSize: '1개 (100g)', servingGrams: 100, calories: 195, carbs: 35, protein: 5, fat: 4.2 },
  { id: 'samgak-jeonju', name: '삼각김밥 전주비빔 (편의점)', category: 'rice', servingSize: '1개 (100g)', servingGrams: 100, calories: 180, carbs: 36, protein: 4, fat: 2.1 },
  { id: 'kimbap-tuna', name: '참치김밥', category: 'rice', servingSize: '1줄 (250g)', servingGrams: 250, calories: 480, carbs: 62, protein: 18, fat: 16 },
  { id: 'kimbap-veggie', name: '야채김밥', category: 'rice', servingSize: '1줄 (230g)', servingGrams: 230, calories: 380, carbs: 58, protein: 10, fat: 9 },
  { id: 'bibimbap', name: '산채 비빔밥', category: 'rice', servingSize: '1그릇 (450g)', servingGrams: 450, calories: 520, carbs: 88, protein: 16, fat: 12 },
  { id: 'fried-rice-chicken', name: '닭가슴살 볶음밥', category: 'rice', servingSize: '1인분 (250g)', servingGrams: 250, calories: 390, carbs: 55, protein: 24, fat: 8 },
  { id: 'fried-rice-kimchi', name: '김치볶음밥 (계란후라이 포함)', category: 'rice', servingSize: '1인분 (300g)', servingGrams: 300, calories: 480, carbs: 74, protein: 14, fat: 13 },
  { id: 'bibigo-mandu', name: '비비고 왕교자 만두', category: 'rice', servingSize: '4개 (140g)', servingGrams: 140, calories: 275, carbs: 26, protein: 9, fat: 15 },

  // ==========================================
  // 단백질, 닭가슴살 & 육류 (Proteins & Meats)
  // ==========================================
  { id: 'chicken-breast', name: '닭가슴살 (스팀/수비드 100g)', category: 'protein', servingSize: '1팩 (100g)', servingGrams: 100, calories: 115, carbs: 0.5, protein: 24, fat: 1.5 },
  { id: 'chicken-breast-smoked', name: '훈제 닭가슴살', category: 'protein', servingSize: '1팩 (100g)', servingGrams: 100, calories: 125, carbs: 1.2, protein: 25, fat: 2.0 },
  { id: 'chicken-sausage', name: '굽네 / 닭가슴살 소시지', category: 'protein', servingSize: '1팩 (100g)', servingGrams: 100, calories: 145, carbs: 2, protein: 21, fat: 5.5 },
  { id: 'harim-chicken', name: '하림 닭가슴살 오리지널', category: 'protein', servingSize: '1팩 (100g)', servingGrams: 100, calories: 110, carbs: 0, protein: 24, fat: 1.2 },
  { id: 'gamdongran', name: '감동란 (편의점 반숙란 2개)', category: 'protein', servingSize: '2개 (100g)', servingGrams: 100, calories: 130, carbs: 1.2, protein: 12.8, fat: 8.2 },
  { id: 'egg-boiled', name: '삶은 달걀', category: 'protein', servingSize: '2개 (100g)', servingGrams: 100, calories: 155, carbs: 1.1, protein: 13, fat: 10.5 },
  { id: 'egg-fried', name: '계란후라이', category: 'protein', servingSize: '1개 (50g)', servingGrams: 50, calories: 95, carbs: 0.6, protein: 6.3, fat: 7.2 },
  { id: 'egg-white', name: '달걀 흰자', category: 'protein', servingSize: '3개분 (100g)', servingGrams: 100, calories: 52, carbs: 0.7, protein: 11, fat: 0.2 },
  { id: 'beef-tenderloin', name: '소고기 우둔/홍두깨살', category: 'protein', servingSize: '1인분 (150g)', servingGrams: 150, calories: 220, carbs: 0, protein: 38, fat: 6.5 },
  { id: 'beef-sirloin', name: '소고기 등심구이', category: 'protein', servingSize: '1인분 (150g)', servingGrams: 150, calories: 340, carbs: 0, protein: 32, fat: 23 },
  { id: 'beef-bulgogi', name: '소불고기', category: 'protein', servingSize: '1인분 (200g)', servingGrams: 200, calories: 380, carbs: 18, protein: 32, fat: 19 },
  { id: 'pork-tenderloin', name: '돼지고기 안심 구이', category: 'protein', servingSize: '1인분 (150g)', servingGrams: 150, calories: 235, carbs: 0, protein: 36, fat: 8.8 },
  { id: 'pork-belly', name: '삼겹살 구이', category: 'protein', servingSize: '1인분 (150g)', servingGrams: 150, calories: 520, carbs: 0, protein: 26, fat: 46 },
  { id: 'pork-jeyuk', name: '제육볶음', category: 'protein', servingSize: '1인분 (200g)', servingGrams: 200, calories: 420, carbs: 14, protein: 34, fat: 25 },
  { id: 'salmon-grilled', name: '연어 구이', category: 'protein', servingSize: '1토막 (150g)', servingGrams: 150, calories: 310, carbs: 0, protein: 34, fat: 18 },
  { id: 'mackerel-grilled', name: '고등어 구이', category: 'protein', servingSize: '반 마리 (150g)', servingGrams: 150, calories: 285, carbs: 0.2, protein: 29, fat: 18 },
  { id: 'tofu-steamed', name: '두부 (생/데침)', category: 'protein', servingSize: '반 모 (150g)', servingGrams: 150, calories: 125, carbs: 3.5, protein: 14, fat: 6.5 },
  { id: 'canned-tuna-light', name: '동원 / 라이트 참치캔 (기름제거)', category: 'protein', servingSize: '1캔 (100g)', servingGrams: 100, calories: 110, carbs: 0, protein: 22, fat: 2 },
  { id: 'protein-shake', name: '단백질 쉐이크 (WPI/물 기준)', category: 'protein', servingSize: '1회 (30g 분말+물)', servingGrams: 30, calories: 120, carbs: 2.5, protein: 24, fat: 1.2 },
  { id: 'protein-drink-the-danbaek', name: '더단백 드링크 초코 (RTD)', category: 'protein', servingSize: '1팩 (250ml)', servingGrams: 250, calories: 105, carbs: 7, protein: 20, fat: 0.8 },
  { id: 'protein-drink-takefit', name: '테이크핏 맥스 프로틴 (호박고구마/초코)', category: 'protein', servingSize: '1팩 (250ml)', servingGrams: 250, calories: 105, carbs: 3, protein: 21, fat: 1.2 },
  { id: 'protein-drink-hymune', name: '하이뮨 프로틴 밸런스 액상', category: 'protein', servingSize: '1팩 (250ml)', servingGrams: 250, calories: 150, carbs: 14, protein: 12, fat: 5.5 },

  // ==========================================
  // 국 및 찌개류 (Soups & Stews)
  // ==========================================
  { id: 'soybean-paste-stew', name: '된장찌개', category: 'soup', servingSize: '1뚝배기 (300g)', servingGrams: 300, calories: 145, carbs: 12, protein: 11, fat: 5.5 },
  { id: 'kimchi-stew', name: '돼지고기 김치찌개', category: 'soup', servingSize: '1뚝배기 (350g)', servingGrams: 350, calories: 230, carbs: 14, protein: 16, fat: 12 },
  { id: 'seaweed-soup', name: '소고기 미역국', category: 'soup', servingSize: '1대접 (300g)', servingGrams: 300, calories: 120, carbs: 6, protein: 9, fat: 6.5 },
  { id: 'beef-radish-soup', name: '소고기 뭇국', category: 'soup', servingSize: '1대접 (300g)', servingGrams: 300, calories: 110, carbs: 7, protein: 10, fat: 4.8 },
  { id: 'samgyetang', name: '삼계탕 (반 마리)', category: 'soup', servingSize: '반 마리 (500g)', servingGrams: 500, calories: 460, carbs: 22, protein: 46, fat: 19 },
  { id: 'soft-tofu-stew', name: '해물 순두부찌개', category: 'soup', servingSize: '1뚝배기 (350g)', servingGrams: 350, calories: 195, carbs: 11, protein: 17, fat: 9 },
  { id: 'seolleongtang', name: '설렁탕 (밥 제외)', category: 'soup', servingSize: '1그릇 (450g)', servingGrams: 450, calories: 220, carbs: 4, protein: 25, fat: 11 },

  // ==========================================
  // 샐러드 및 야채 (Salads & Veggies)
  // ==========================================
  { id: 'chicken-salad', name: '닭가슴살 샐러드 (오리엔탈/발사믹)', category: 'salad', servingSize: '1보울 (250g)', servingGrams: 250, calories: 240, carbs: 15, protein: 26, fat: 7.5 },
  { id: 'ricotta-salad', name: '리코타 치즈 샐러드', category: 'salad', servingSize: '1보울 (220g)', servingGrams: 220, calories: 290, carbs: 19, protein: 12, fat: 18 },
  { id: 'avocado', name: '아보카도', category: 'salad', servingSize: '반 개 (80g)', servingGrams: 80, calories: 130, carbs: 7, protein: 1.6, fat: 12 },
  { id: 'green-salad', name: '모둠 채소 샐러드 (드레싱X)', category: 'salad', servingSize: '1접시 (120g)', servingGrams: 120, calories: 35, carbs: 6, protein: 2, fat: 0.5 },
  { id: 'cherry-tomatoes', name: '방울토마토', category: 'salad', servingSize: '10알 (150g)', servingGrams: 150, calories: 30, carbs: 6.5, protein: 1.4, fat: 0.3 },
  { id: 'cucumber', name: '오이', category: 'salad', servingSize: '1개 (120g)', servingGrams: 120, calories: 18, carbs: 3.5, protein: 0.8, fat: 0.1 },

  // ==========================================
  // 외식, 패스트푸드, 브랜드 라면 & 분식
  // ==========================================
  // [봉지라면 인기 15종]
  { id: 'ramen-shin', name: '농심 신라면 (봉지)', category: 'general', servingSize: '1봉지 (120g)', servingGrams: 120, calories: 500, carbs: 79, protein: 10, fat: 16 },
  { id: 'ramen-shin-gunmyeon', name: '농심 신라면 건면 (다이어트 라면)', category: 'general', servingSize: '1봉지 (97g)', servingGrams: 97, calories: 350, carbs: 71, protein: 9, fat: 3.6 },
  { id: 'ramen-jin-hot', name: '오뚜기 진라면 매운맛 (봉지)', category: 'general', servingSize: '1봉지 (120g)', servingGrams: 120, calories: 500, carbs: 80, protein: 10, fat: 15 },
  { id: 'ramen-jin-mild', name: '오뚜기 진라면 순한맛 (봉지)', category: 'general', servingSize: '1봉지 (120g)', servingGrams: 120, calories: 500, carbs: 80, protein: 11, fat: 15 },
  { id: 'ramen-chapagetti', name: '농심 짜파게티 (봉지)', category: 'general', servingSize: '1봉지 (140g)', servingGrams: 140, calories: 610, carbs: 97, protein: 11, fat: 20 },
  { id: 'ramen-neoguri', name: '농심 얼큰한 너구리 (봉지)', category: 'general', servingSize: '1봉지 (120g)', servingGrams: 120, calories: 495, carbs: 80, protein: 9, fat: 15 },
  { id: 'ramen-anseong', name: '농심 안성탕면 (봉지)', category: 'general', servingSize: '1봉지 (125g)', servingGrams: 125, calories: 525, carbs: 82, protein: 10, fat: 17 },
  { id: 'ramen-buldak', name: '삼양 불닭볶음면 (봉지)', category: 'general', servingSize: '1봉지 (140g)', servingGrams: 140, calories: 530, carbs: 85, protein: 12, fat: 16 },
  { id: 'ramen-carbo-buldak', name: '삼양 까르보 불닭볶음면 (봉지)', category: 'general', servingSize: '1봉지 (130g)', servingGrams: 130, calories: 550, carbs: 84, protein: 9, fat: 20 },
  { id: 'ramen-paldo-bibim', name: '팔도 비빔면 (봉지)', category: 'general', servingSize: '1봉지 (130g)', servingGrams: 130, calories: 530, carbs: 82, protein: 9, fat: 19 },
  { id: 'ramen-yeol', name: '오뚜기 열라면 (봉지)', category: 'general', servingSize: '1봉지 (120g)', servingGrams: 120, calories: 510, carbs: 82, protein: 11, fat: 15 },
  { id: 'ramen-sesame', name: '오뚜기 참깨라면 (봉지)', category: 'general', servingSize: '1봉지 (115g)', servingGrams: 115, calories: 490, carbs: 75, protein: 10, fat: 17 },
  { id: 'ramen-samyang', name: '삼양라면 오리지널 (봉지)', category: 'general', servingSize: '1봉지 (120g)', servingGrams: 120, calories: 500, carbs: 79, protein: 10, fat: 16 },
  { id: 'ramen-myeolchi-kalguksu', name: '농심 멸치칼국수 (건면/저칼로리)', category: 'general', servingSize: '1봉지 (98g)', servingGrams: 98, calories: 360, carbs: 75, protein: 9, fat: 2.5 },

  // [컵라면 & 용기면 인기 10종]
  { id: 'ramen-yukgaejang-cup', name: '농심 육개장 사발면 (컵)', category: 'general', servingSize: '1사발 (86g)', servingGrams: 86, calories: 375, carbs: 55, protein: 7, fat: 14 },
  { id: 'ramen-kimchi-cup', name: '농심 김치사발면 (컵)', category: 'general', servingSize: '1사발 (86g)', servingGrams: 86, calories: 375, carbs: 56, protein: 7, fat: 14 },
  { id: 'ramen-shin-cup-small', name: '농심 신라면 소컵', category: 'general', servingSize: '1컵 (65g)', servingGrams: 65, calories: 300, carbs: 44, protein: 5, fat: 12 },
  { id: 'ramen-shin-cup-big', name: '농심 신라면 큰사발', category: 'general', servingSize: '1사발 (114g)', servingGrams: 114, calories: 490, carbs: 75, protein: 9, fat: 17 },
  { id: 'ramen-wangttukkeong', name: '팔도 왕뚜껑', category: 'general', servingSize: '1용기 (110g)', servingGrams: 110, calories: 475, carbs: 72, protein: 9, fat: 17 },
  { id: 'ramen-sesame-cup', name: '오뚜기 참깨라면 용기면', category: 'general', servingSize: '1컵 (110g)', servingGrams: 110, calories: 490, carbs: 70, protein: 9, fat: 20 },
  { id: 'ramen-chapagetti-beombeok', name: '농심 짜파게티 범벅 (소형컵)', category: 'general', servingSize: '1컵 (70g)', servingGrams: 70, calories: 315, carbs: 49, protein: 6, fat: 11 },

  // [오뚜기 컵누들 다이어트 라면 시리즈]
  { id: 'cup-noodle-spicy', name: '오뚜기 컵누들 매콤한맛', category: 'general', servingSize: '1컵 (37.8g)', servingGrams: 38, calories: 120, carbs: 27, protein: 1, fat: 0.7 },
  { id: 'cup-noodle-udong', name: '오뚜기 컵누들 우동맛', category: 'general', servingSize: '1컵 (38.1g)', servingGrams: 38, calories: 120, carbs: 28, protein: 1, fat: 0.6 },
  { id: 'cup-noodle-rose', name: '오뚜기 컵누들 로제맛', category: 'general', servingSize: '1컵 (47.8g)', servingGrams: 48, calories: 165, carbs: 35, protein: 2.5, fat: 1.6 },
  { id: 'cup-noodle-maratang', name: '오뚜기 컵누들 마라탕맛', category: 'general', servingSize: '1컵 (44.7g)', servingGrams: 45, calories: 150, carbs: 32, protein: 2, fat: 1.4 },
  { id: 'cup-noodle-jjajang', name: '오뚜기 컵누들 짜장맛', category: 'general', servingSize: '1컵 (44g)', servingGrams: 44, calories: 170, carbs: 36, protein: 2, fat: 2 },

  // [외식 & 일반 분식]
  { id: 'jjajangmyeon', name: '짜장면', category: 'general', servingSize: '1그릇 (600g)', servingGrams: 600, calories: 720, carbs: 110, protein: 20, fat: 22 },
  { id: 'jjamppong', name: '짬뽕', category: 'general', servingSize: '1그릇 (700g)', servingGrams: 700, calories: 550, carbs: 88, protein: 24, fat: 12 },
  { id: 'maratang', name: '마라탕 (야채+소고기 1인분)', category: 'general', servingSize: '1그릇 (500g)', servingGrams: 500, calories: 650, carbs: 45, protein: 32, fat: 38 },
  { id: 'tonkatsu', name: '등심 돈까스 (밥 제외)', category: 'general', servingSize: '1인분 (200g)', servingGrams: 200, calories: 560, carbs: 36, protein: 28, fat: 34 },
  { id: 'tteokbokki', name: '떡볶이', category: 'general', servingSize: '1인분 (200g)', servingGrams: 200, calories: 360, carbs: 75, protein: 7, fat: 3.5 },
  { id: 'sushi-assorted', name: '모둠 초밥', category: 'general', servingSize: '10피스 (300g)', servingGrams: 300, calories: 480, carbs: 78, protein: 24, fat: 7 },
  { id: 'subway-roast-chicken', name: '서브웨이 로스트치킨 (위트/야채)', category: 'general', servingSize: '15cm 1개', servingGrams: 240, calories: 320, carbs: 42, protein: 26, fat: 4.8 },
  { id: 'subway-egg-mayo', name: '서브웨이 에그마요', category: 'general', servingSize: '15cm 1개', servingGrams: 240, calories: 480, carbs: 45, protein: 16, fat: 26 },
  { id: 'subway-turkey', name: '서브웨이 터키', category: 'general', servingSize: '15cm 1개', servingGrams: 220, calories: 259, carbs: 40, protein: 19, fat: 3.5 },
  { id: 'burger-cyburger', name: '맘스터치 싸이버거', category: 'general', servingSize: '1개 (230g)', servingGrams: 230, calories: 594, carbs: 58, protein: 28, fat: 27 },
  { id: 'burger-bigmac', name: '맥도날드 빅맥', category: 'general', servingSize: '1개 (223g)', servingGrams: 223, calories: 582, carbs: 46, protein: 27, fat: 31 },
  { id: 'burger-shanghai', name: '맥도날드 상하이 치킨버거', category: 'general', servingSize: '1개 (235g)', servingGrams: 235, calories: 503, carbs: 56, protein: 21, fat: 21 },
  { id: 'burger-whopper', name: '버거킹 와퍼', category: 'general', servingSize: '1개 (278g)', servingGrams: 278, calories: 619, carbs: 50, protein: 31, fat: 35 },
  { id: 'pizza-combination', name: '콤비네이션 피자', category: 'general', servingSize: '1조각 (100g)', servingGrams: 100, calories: 260, carbs: 28, protein: 12, fat: 11 },
  { id: 'fried-chicken', name: '후라이드 치킨', category: 'general', servingSize: '2조각 (180g)', servingGrams: 180, calories: 510, carbs: 22, protein: 36, fat: 30 },
  { id: 'yangnyeom-chicken', name: '양념 치킨', category: 'general', servingSize: '2조각 (200g)', servingGrams: 200, calories: 570, carbs: 38, protein: 34, fat: 29 },
  { id: 'bossam', name: '보쌈 (수육)', category: 'general', servingSize: '1인분 (150g)', servingGrams: 150, calories: 380, carbs: 2, protein: 29, fat: 28 },

  // ==========================================
  // 간식, 과일, 음료 & 브랜드 커피
  // ==========================================
  { id: 'banana', name: '바나나', category: 'snack', servingSize: '1개 (110g)', servingGrams: 110, calories: 100, carbs: 26, protein: 1.3, fat: 0.3 },
  { id: 'apple', name: '사과', category: 'snack', servingSize: '1개 중간 (200g)', servingGrams: 200, calories: 105, carbs: 27, protein: 0.5, fat: 0.4 },
  { id: 'greek-yogurt-plain', name: '그릭 요거트 (무가당)', category: 'snack', servingSize: '1회 (100g)', servingGrams: 100, calories: 90, carbs: 4, protein: 10, fat: 3.5 },
  { id: 'mixed-nuts', name: '하루 한 줌 견과', category: 'snack', servingSize: '1봉 (25g)', servingGrams: 25, calories: 155, carbs: 5, protein: 4.5, fat: 13.5 },
  { id: 'protein-bar', name: '단백질 프로틴 바', category: 'snack', servingSize: '1개 (50g)', servingGrams: 50, calories: 190, carbs: 18, protein: 15, fat: 6 },
  { id: 'starbucks-americano', name: '스타벅스 아이스 아메리카노 Tall', category: 'drink', servingSize: '1잔 (355ml)', servingGrams: 355, calories: 10, carbs: 1.5, protein: 0.8, fat: 0.1 },
  { id: 'starbucks-latte', name: '스타벅스 카페 라떼 Tall', category: 'drink', servingSize: '1잔 (355ml)', servingGrams: 355, calories: 180, carbs: 14, protein: 10, fat: 9 },
  { id: 'binggrae-banana-milk', name: '빙그레 바나나맛우유', category: 'drink', servingSize: '1개 (240ml)', servingGrams: 240, calories: 208, carbs: 27, protein: 5.8, fat: 6.4 },
  { id: 'soy-milk-unsweetened', name: '매일두유 99.9 (무가당)', category: 'drink', servingSize: '1팩 (190ml)', servingGrams: 190, calories: 95, carbs: 4, protein: 9, fat: 5 },
  { id: 'coca-cola-zero', name: '코카콜라 제로 (355ml)', category: 'drink', servingSize: '1캔 (355ml)', servingGrams: 355, calories: 0, carbs: 0, protein: 0, fat: 0 },
  { id: 'pepsi-zero-lime', name: '펩시 제로 슈거 라임 (355ml)', category: 'drink', servingSize: '1캔 (355ml)', servingGrams: 355, calories: 0, carbs: 0, protein: 0, fat: 0 },
  { id: 'monster-zero', name: '몬스터 에너지 울트라 (화이트 제로)', category: 'drink', servingSize: '1캔 (355ml)', servingGrams: 355, calories: 14, carbs: 4, protein: 0, fat: 0 },
];

export const CATEGORY_LABELS: Record<string, string> = {
  rice: '밥·곡물·즉석밥',
  protein: '육류·단백질·프로틴',
  soup: '국·찌개',
  salad: '샐러드·채소',
  general: '식사·외식·브랜드',
  snack: '간식·과일',
  drink: '음료·커피',
};

export const MEAL_TYPE_LABELS: Record<string, { label: string; timeHint: string; english: string }> = {
  breakfast: { label: '아침', timeHint: '07:00 ~ 09:00', english: 'Breakfast' },
  lunch: { label: '점심', timeHint: '12:00 ~ 13:30', english: 'Lunch' },
  dinner: { label: '저녁', timeHint: '18:00 ~ 20:00', english: 'Dinner' },
  snack: { label: '간식/음료', timeHint: '식간 또는 운동 전후', english: 'Snacks & Drinks' },
};
