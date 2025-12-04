import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

type Word = {
  word: string;
  translation: string;
  category: string;
};

type Category = {
  id: string;
  name: string;
  icon: string;
  gradient: string;
  level: 'beginner' | 'intermediate' | 'advanced';
};

const categories: Category[] = [
  { id: 'animals', name: 'Животные', icon: 'Cat', gradient: 'from-purple-500 to-pink-500', level: 'beginner' },
  { id: 'food', name: 'Еда', icon: 'Apple', gradient: 'from-orange-500 to-red-500', level: 'beginner' },
  { id: 'home', name: 'Дом', icon: 'Home', gradient: 'from-green-500 to-emerald-500', level: 'beginner' },
  { id: 'body', name: 'Тело', icon: 'User', gradient: 'from-rose-500 to-pink-500', level: 'beginner' },
  { id: 'travel', name: 'Путешествия', icon: 'Plane', gradient: 'from-blue-500 to-cyan-500', level: 'intermediate' },
  { id: 'clothes', name: 'Одежда', icon: 'Shirt', gradient: 'from-violet-500 to-purple-500', level: 'intermediate' },
  { id: 'nature', name: 'Природа', icon: 'Trees', gradient: 'from-lime-500 to-green-500', level: 'intermediate' },
  { id: 'time', name: 'Время', icon: 'Clock', gradient: 'from-amber-500 to-yellow-500', level: 'intermediate' },
  { id: 'tech', name: 'Технологии', icon: 'Laptop', gradient: 'from-indigo-500 to-purple-500', level: 'advanced' },
  { id: 'sport', name: 'Спорт', icon: 'Dumbbell', gradient: 'from-red-500 to-orange-500', level: 'advanced' },
  { id: 'music', name: 'Музыка', icon: 'Music', gradient: 'from-fuchsia-500 to-pink-500', level: 'advanced' },
  { id: 'school', name: 'Школа', icon: 'BookOpen', gradient: 'from-sky-500 to-blue-500', level: 'advanced' },
];

const wordsData: Record<string, Word[]> = {
  animals: [
    { word: 'Cat', translation: 'Кот', category: 'animals' },
    { word: 'Dog', translation: 'Собака', category: 'animals' },
    { word: 'Bird', translation: 'Птица', category: 'animals' },
    { word: 'Fish', translation: 'Рыба', category: 'animals' },
    { word: 'Lion', translation: 'Лев', category: 'animals' },
    { word: 'Elephant', translation: 'Слон', category: 'animals' },
    { word: 'Mouse', translation: 'Мышь', category: 'animals' },
    { word: 'Horse', translation: 'Лошадь', category: 'animals' },
  ],
  food: [
    { word: 'Apple', translation: 'Яблоко', category: 'food' },
    { word: 'Bread', translation: 'Хлеб', category: 'food' },
    { word: 'Cheese', translation: 'Сыр', category: 'food' },
    { word: 'Coffee', translation: 'Кофе', category: 'food' },
    { word: 'Water', translation: 'Вода', category: 'food' },
    { word: 'Milk', translation: 'Молоко', category: 'food' },
    { word: 'Egg', translation: 'Яйцо', category: 'food' },
    { word: 'Sugar', translation: 'Сахар', category: 'food' },
  ],
  travel: [
    { word: 'Airport', translation: 'Аэропорт', category: 'travel' },
    { word: 'Hotel', translation: 'Отель', category: 'travel' },
    { word: 'Ticket', translation: 'Билет', category: 'travel' },
    { word: 'Map', translation: 'Карта', category: 'travel' },
    { word: 'Train', translation: 'Поезд', category: 'travel' },
    { word: 'Bus', translation: 'Автобус', category: 'travel' },
    { word: 'Passport', translation: 'Паспорт', category: 'travel' },
    { word: 'Luggage', translation: 'Багаж', category: 'travel' },
  ],
  tech: [
    { word: 'Computer', translation: 'Компьютер', category: 'tech' },
    { word: 'Phone', translation: 'Телефон', category: 'tech' },
    { word: 'Internet', translation: 'Интернет', category: 'tech' },
    { word: 'Keyboard', translation: 'Клавиатура', category: 'tech' },
    { word: 'Screen', translation: 'Экран', category: 'tech' },
    { word: 'Mouse', translation: 'Мышка', category: 'tech' },
    { word: 'Cable', translation: 'Кабель', category: 'tech' },
    { word: 'Battery', translation: 'Батарея', category: 'tech' },
  ],
  home: [
    { word: 'Table', translation: 'Стол', category: 'home' },
    { word: 'Chair', translation: 'Стул', category: 'home' },
    { word: 'Door', translation: 'Дверь', category: 'home' },
    { word: 'Window', translation: 'Окно', category: 'home' },
    { word: 'Bed', translation: 'Кровать', category: 'home' },
    { word: 'Lamp', translation: 'Лампа', category: 'home' },
    { word: 'Mirror', translation: 'Зеркало', category: 'home' },
    { word: 'Carpet', translation: 'Ковёр', category: 'home' },
  ],
  nature: [
    { word: 'Tree', translation: 'Дерево', category: 'nature' },
    { word: 'Flower', translation: 'Цветок', category: 'nature' },
    { word: 'Sun', translation: 'Солнце', category: 'nature' },
    { word: 'Moon', translation: 'Луна', category: 'nature' },
    { word: 'Star', translation: 'Звезда', category: 'nature' },
    { word: 'River', translation: 'Река', category: 'nature' },
    { word: 'Mountain', translation: 'Гора', category: 'nature' },
    { word: 'Forest', translation: 'Лес', category: 'nature' },
  ],
  body: [
    { word: 'Head', translation: 'Голова', category: 'body' },
    { word: 'Hand', translation: 'Рука', category: 'body' },
    { word: 'Leg', translation: 'Нога', category: 'body' },
    { word: 'Eye', translation: 'Глаз', category: 'body' },
    { word: 'Ear', translation: 'Ухо', category: 'body' },
    { word: 'Nose', translation: 'Нос', category: 'body' },
    { word: 'Mouth', translation: 'Рот', category: 'body' },
    { word: 'Heart', translation: 'Сердце', category: 'body' },
  ],
  clothes: [
    { word: 'Shirt', translation: 'Рубашка', category: 'clothes' },
    { word: 'Pants', translation: 'Штаны', category: 'clothes' },
    { word: 'Dress', translation: 'Платье', category: 'clothes' },
    { word: 'Shoes', translation: 'Обувь', category: 'clothes' },
    { word: 'Hat', translation: 'Шапка', category: 'clothes' },
    { word: 'Jacket', translation: 'Куртка', category: 'clothes' },
    { word: 'Socks', translation: 'Носки', category: 'clothes' },
    { word: 'Gloves', translation: 'Перчатки', category: 'clothes' },
  ],
  sport: [
    { word: 'Ball', translation: 'Мяч', category: 'sport' },
    { word: 'Run', translation: 'Бежать', category: 'sport' },
    { word: 'Jump', translation: 'Прыгать', category: 'sport' },
    { word: 'Swim', translation: 'Плавать', category: 'sport' },
    { word: 'Goal', translation: 'Гол', category: 'sport' },
    { word: 'Team', translation: 'Команда', category: 'sport' },
    { word: 'Win', translation: 'Победа', category: 'sport' },
    { word: 'Game', translation: 'Игра', category: 'sport' },
  ],
  music: [
    { word: 'Song', translation: 'Песня', category: 'music' },
    { word: 'Piano', translation: 'Пианино', category: 'music' },
    { word: 'Guitar', translation: 'Гитара', category: 'music' },
    { word: 'Drum', translation: 'Барабан', category: 'music' },
    { word: 'Voice', translation: 'Голос', category: 'music' },
    { word: 'Note', translation: 'Нота', category: 'music' },
    { word: 'Concert', translation: 'Концерт', category: 'music' },
    { word: 'Dance', translation: 'Танец', category: 'music' },
  ],
  school: [
    { word: 'Book', translation: 'Книга', category: 'school' },
    { word: 'Pen', translation: 'Ручка', category: 'school' },
    { word: 'Pencil', translation: 'Карандаш', category: 'school' },
    { word: 'Teacher', translation: 'Учитель', category: 'school' },
    { word: 'Student', translation: 'Ученик', category: 'school' },
    { word: 'Lesson', translation: 'Урок', category: 'school' },
    { word: 'Homework', translation: 'Домашка', category: 'school' },
    { word: 'Test', translation: 'Тест', category: 'school' },
  ],
  time: [
    { word: 'Day', translation: 'День', category: 'time' },
    { word: 'Night', translation: 'Ночь', category: 'time' },
    { word: 'Morning', translation: 'Утро', category: 'time' },
    { word: 'Evening', translation: 'Вечер', category: 'time' },
    { word: 'Hour', translation: 'Час', category: 'time' },
    { word: 'Minute', translation: 'Минута', category: 'time' },
    { word: 'Week', translation: 'Неделя', category: 'time' },
    { word: 'Year', translation: 'Год', category: 'time' },
  ],
};

type Achievement = {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: number;
  unlocked: boolean;
};

type Screen = 'home' | 'study' | 'test' | 'results';

export default function Index() {
  const [screen, setScreen] = useState<Screen>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [testAnswers, setTestAnswers] = useState<boolean[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userStats, setUserStats] = useState({ correct: 0, total: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const playSound = (type: 'correct' | 'wrong' | 'achievement') => {
    if (!soundEnabled) return;
    
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    if (type === 'correct') {
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } else if (type === 'wrong') {
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.2);
    } else if (type === 'achievement') {
      oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.15);
      oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.3);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    }
  };

  const achievements: Achievement[] = [
    { id: 'first', name: 'Первые шаги', description: 'Ответь правильно на 1 вопрос', icon: 'Star', requirement: 1, unlocked: userStats.correct >= 1 },
    { id: 'beginner', name: 'Новичок', description: '10 правильных ответов', icon: 'Award', requirement: 10, unlocked: userStats.correct >= 10 },
    { id: 'learner', name: 'Ученик', description: '25 правильных ответов', icon: 'BookOpen', requirement: 25, unlocked: userStats.correct >= 25 },
    { id: 'expert', name: 'Эксперт', description: '50 правильных ответов', icon: 'Medal', requirement: 50, unlocked: userStats.correct >= 50 },
    { id: 'master', name: 'Мастер', description: '100 правильных ответов', icon: 'Trophy', requirement: 100, unlocked: userStats.correct >= 100 },
    { id: 'perfectionist', name: 'Перфекционист', description: 'Пройди тест на 100%', icon: 'Sparkles', requirement: -1, unlocked: false },
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const nextAchievement = achievements.find(a => !a.unlocked && a.requirement > 0);

  const levelLabels = {
    beginner: 'Начальный',
    intermediate: 'Средний',
    advanced: 'Продвинутый'
  };

  const filteredCategories = categories.filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || cat.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  const selectCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentWordIndex(0);
    setShowTranslation(false);
    setScreen('study');
  };

  const startTest = () => {
    setTestAnswers([]);
    setCurrentQuestion(0);
    setScreen('test');
  };

  const getCurrentWords = () => wordsData[selectedCategory] || [];

  const nextWord = () => {
    const words = getCurrentWords();
    if (currentWordIndex < words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
      setShowTranslation(false);
    }
  };

  const prevWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
      setShowTranslation(false);
    }
  };

  const answerQuestion = (isCorrect: boolean) => {
    const newAnswers = [...testAnswers, isCorrect];
    setTestAnswers(newAnswers);

    let newStats = userStats;
    if (isCorrect) {
      playSound('correct');
      newStats = { correct: userStats.correct + 1, total: userStats.total + 1 };
      setUserStats(newStats);
      
      const justUnlocked = achievements.find(
        a => a.requirement === newStats.correct && a.requirement > 0
      );
      if (justUnlocked) {
        setTimeout(() => {
          playSound('achievement');
          setShowAchievement(justUnlocked);
          setTimeout(() => setShowAchievement(null), 4000);
        }, 500);
      }
    } else {
      playSound('wrong');
      newStats = { ...userStats, total: userStats.total + 1 };
      setUserStats(newStats);
    }

    const words = getCurrentWords();
    if (currentQuestion < words.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setScreen('results');
    }
  };

  const goHome = () => {
    setScreen('home');
    setSelectedCategory('');
    setCurrentWordIndex(0);
    setShowTranslation(false);
  };

  if (screen === 'home') {
    return (
      <div className={`min-h-screen transition-colors duration-300 p-6 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' 
          : 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50'
      }`}>
        <div className="max-w-6xl mx-auto">
          {showAchievement && (
            <div className="fixed top-6 right-6 z-50 animate-slide-in-right">
              <Card className="p-6 bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-400 shadow-2xl max-w-sm">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center animate-scale-in">
                    <Icon name={showAchievement.icon as any} className="text-white" size={32} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Icon name="Sparkles" className="text-yellow-600" size={16} />
                      <span className="text-xs font-semibold text-yellow-700 uppercase">Достижение получено!</span>
                    </div>
                    <h3 className="font-bold text-lg">{showAchievement.name}</h3>
                    <p className="text-sm text-gray-600">{showAchievement.description}</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          <div className="fixed top-6 left-6 z-40 flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              className={darkMode ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : ''}
            >
              <Icon name={darkMode ? 'Sun' : 'Moon'} size={20} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={darkMode ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : ''}
            >
              <Icon name={soundEnabled ? 'Volume2' : 'VolumeX'} size={20} />
            </Button>
          </div>
          
          <div className="text-center mb-8 animate-fade-in">
            <h1 className={`text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 ${darkMode ? 'opacity-90' : ''}`}>
              Учи Слова
            </h1>
            <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Изучай языки легко и весело</p>
          </div>

          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Поиск категорий..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>

            <div className="flex items-center justify-center gap-2 flex-wrap">
              <Badge
                variant={selectedLevel === 'all' ? 'default' : 'outline'}
                className="cursor-pointer px-4 py-2 text-sm"
                onClick={() => setSelectedLevel('all')}
              >
                Все уровни
              </Badge>
              <Badge
                variant={selectedLevel === 'beginner' ? 'default' : 'outline'}
                className="cursor-pointer px-4 py-2 text-sm bg-green-500 hover:bg-green-600"
                onClick={() => setSelectedLevel('beginner')}
              >
                🟢 Начальный
              </Badge>
              <Badge
                variant={selectedLevel === 'intermediate' ? 'default' : 'outline'}
                className="cursor-pointer px-4 py-2 text-sm bg-yellow-500 hover:bg-yellow-600"
                onClick={() => setSelectedLevel('intermediate')}
              >
                🟡 Средний
              </Badge>
              <Badge
                variant={selectedLevel === 'advanced' ? 'default' : 'outline'}
                className="cursor-pointer px-4 py-2 text-sm bg-red-500 hover:bg-red-600"
                onClick={() => setSelectedLevel('advanced')}
              >
                🔴 Продвинутый
              </Badge>
            </div>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="SearchX" className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-xl text-gray-600">Категории не найдены</p>
              <p className="text-gray-500 mt-2">Попробуйте изменить фильтры</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {filteredCategories.map((cat, index) => (
                <Card
                  key={cat.id}
                  className="p-6 cursor-pointer hover:scale-105 transition-all duration-300 border-2 hover:shadow-2xl animate-scale-in relative"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => selectCategory(cat.id)}
                >
                  <Badge className={`absolute top-3 right-3 ${
                    cat.level === 'beginner' ? 'bg-green-500' : 
                    cat.level === 'intermediate' ? 'bg-yellow-500' : 
                    'bg-red-500'
                  }`}>
                    {levelLabels[cat.level]}
                  </Badge>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-4 mx-auto`}>
                    <Icon name={cat.icon as any} className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-center">{cat.name}</h3>
                  <p className="text-center text-gray-500 mt-2">{wordsData[cat.id].length} слов</p>
                </Card>
              ))}
            </div>
          )}

          {userStats.total > 0 && (
            <div className="space-y-6">
              <Card className="p-6 max-w-md mx-auto bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Icon name="Trophy" className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Твоя статистика</h3>
                      <p className="text-gray-600 text-sm">Общий прогресс</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {Math.round((userStats.correct / userStats.total) * 100)}%
                    </div>
                    <p className="text-sm text-gray-600">{userStats.correct}/{userStats.total}</p>
                  </div>
                </div>
                <Progress value={(userStats.correct / userStats.total) * 100} className="h-3 mb-4" />
                
                {nextAchievement && (
                  <div className="mt-4 pt-4 border-t border-purple-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">До следующего достижения:</span>
                      <span className="font-semibold text-purple-600">
                        {nextAchievement.requirement - userStats.correct} ответов
                      </span>
                    </div>
                  </div>
                )}
              </Card>

              <Card className="p-6 max-w-4xl mx-auto">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Award" className="text-yellow-500" size={24} />
                  <h3 className="font-bold text-lg">Достижения</h3>
                  <Badge variant="secondary">{unlockedAchievements.length}/{achievements.length}</Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {achievements.map((achievement) => (
                    <Card
                      key={achievement.id}
                      className={`p-4 text-center transition-all ${
                        achievement.unlocked
                          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300 border-2'
                          : 'bg-gray-50 opacity-50'
                      }`}
                    >
                      <div className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center ${
                        achievement.unlocked
                          ? 'bg-gradient-to-br from-yellow-400 to-orange-400'
                          : 'bg-gray-300'
                      }`}>
                        <Icon
                          name={achievement.icon as any}
                          className="text-white"
                          size={32}
                        />
                      </div>
                      <h4 className="font-bold text-sm mb-1">{achievement.name}</h4>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </Card>
                  ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (screen === 'study') {
    const words = getCurrentWords();
    const currentWord = words[currentWordIndex];
    const category = categories.find(c => c.id === selectedCategory);

    return (
      <div className={`min-h-screen transition-colors duration-300 p-6 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' 
          : 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50'
      }`}>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button variant="outline" onClick={goHome} className={`gap-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : ''}`}>
              <Icon name="ArrowLeft" size={20} />
              Назад
            </Button>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category?.gradient} flex items-center justify-center`}>
                <Icon name={category?.icon as any} className="text-white" size={16} />
              </div>
              <span className={`font-semibold ${darkMode ? 'text-white' : ''}`}>{category?.name}</span>
            </div>
          </div>

          <div className="mb-6">
            <div className={`flex items-center justify-between text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <span>Слово {currentWordIndex + 1} из {words.length}</span>
              <span>{Math.round(((currentWordIndex + 1) / words.length) * 100)}%</span>
            </div>
            <Progress value={((currentWordIndex + 1) / words.length) * 100} className="h-2" />
          </div>

          <Card 
            className={`p-12 mb-8 cursor-pointer hover:shadow-xl transition-all duration-300 border-2 ${
              darkMode 
                ? 'bg-gradient-to-br from-gray-800 to-purple-900 border-gray-700' 
                : 'bg-gradient-to-br from-white to-purple-50'
            }`}
            onClick={() => setShowTranslation(!showTranslation)}
          >
            <div className="text-center">
              <div className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {currentWord.word}
              </div>
              {showTranslation ? (
                <div className={`text-4xl animate-fade-in ${darkMode ? 'text-gray-200' : 'text-gray-600'}`}>
                  {currentWord.translation}
                </div>
              ) : (
                <div className="text-gray-400 flex items-center justify-center gap-2">
                  <Icon name="Eye" size={20} />
                  <span>Нажми, чтобы увидеть перевод</span>
                </div>
              )}
            </div>
          </Card>

          <div className="flex gap-4 mb-6">
            <Button
              onClick={prevWord}
              disabled={currentWordIndex === 0}
              variant="outline"
              className="flex-1 h-14 text-lg"
            >
              <Icon name="ChevronLeft" size={24} />
              Назад
            </Button>
            <Button
              onClick={nextWord}
              disabled={currentWordIndex === words.length - 1}
              className="flex-1 h-14 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Далее
              <Icon name="ChevronRight" size={24} />
            </Button>
          </div>

          <Button
            onClick={startTest}
            className="w-full h-16 text-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          >
            <Icon name="Play" size={24} />
            Начать тест
          </Button>
        </div>
      </div>
    );
  }

  if (screen === 'test') {
    const words = getCurrentWords();
    const currentWord = words[currentQuestion];
    const allWords = Object.values(wordsData).flat();
    const wrongOptions = allWords
      .filter(w => w.translation !== currentWord.translation)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const options = [currentWord, ...wrongOptions].sort(() => Math.random() - 0.5);

    return (
      <div className={`min-h-screen transition-colors duration-300 p-6 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' 
          : 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50'
      }`}>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button variant="outline" onClick={() => setScreen('study')} className={`gap-2 ${darkMode ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' : ''}`}>
              <Icon name="X" size={20} />
              Отмена
            </Button>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full shadow ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
              <Icon name="Target" size={20} className="text-blue-500" />
              <span className="font-semibold">{currentQuestion + 1}/{words.length}</span>
            </div>
          </div>

          <div className="mb-6">
            <Progress value={((currentQuestion + 1) / words.length) * 100} className="h-2" />
          </div>

          <Card className={`p-12 mb-8 border-2 ${darkMode ? 'bg-gradient-to-br from-gray-800 to-blue-900 border-gray-700' : 'bg-gradient-to-br from-white to-blue-50'}`}>
            <div className="text-center">
              <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Выбери правильный перевод:</p>
              <div className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                {currentWord.word}
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 gap-4">
            {options.map((option, index) => (
              <Button
                key={index}
                onClick={() => answerQuestion(option.translation === currentWord.translation)}
                variant="outline"
                className={`h-16 text-xl hover:scale-105 transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent ${darkMode ? 'bg-gray-800 border-gray-700 text-white hover:bg-gradient-to-r' : ''}`}
              >
                {option.translation}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'results') {
    const correctCount = testAnswers.filter(a => a).length;
    const percentage = Math.round((correctCount / testAnswers.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6 flex items-center justify-center">
        <div className="max-w-lg w-full">
          <Card className="p-12 text-center bg-gradient-to-br from-white to-purple-50 border-2">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-6 animate-scale-in">
              <Icon name={percentage >= 80 ? "Trophy" : percentage >= 60 ? "Star" : "Target"} className="text-white" size={48} />
            </div>
            <h2 className="text-4xl font-bold mb-4">
              {percentage >= 80 ? 'Отлично!' : percentage >= 60 ? 'Хорошо!' : 'Продолжай учиться!'}
            </h2>
            <div className="text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              {percentage}%
            </div>
            <p className="text-xl text-gray-600 mb-8">
              Правильных ответов: {correctCount} из {testAnswers.length}
            </p>
            <Progress value={percentage} className="h-4 mb-8" />
            <div className="flex flex-col gap-4">
              <Button
                onClick={() => setScreen('study')}
                className="h-14 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Icon name="BookOpen" size={24} />
                Изучить снова
              </Button>
              <Button
                onClick={goHome}
                variant="outline"
                className="h-14 text-lg"
              >
                <Icon name="Home" size={24} />
                На главную
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return null;
}