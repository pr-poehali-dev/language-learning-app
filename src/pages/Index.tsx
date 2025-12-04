import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
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
};

const categories: Category[] = [
  { id: 'animals', name: 'Животные', icon: 'Cat', gradient: 'from-purple-500 to-pink-500' },
  { id: 'food', name: 'Еда', icon: 'Apple', gradient: 'from-orange-500 to-red-500' },
  { id: 'travel', name: 'Путешествия', icon: 'Plane', gradient: 'from-blue-500 to-cyan-500' },
  { id: 'tech', name: 'Технологии', icon: 'Laptop', gradient: 'from-indigo-500 to-purple-500' },
];

const wordsData: Record<string, Word[]> = {
  animals: [
    { word: 'Cat', translation: 'Кот', category: 'animals' },
    { word: 'Dog', translation: 'Собака', category: 'animals' },
    { word: 'Bird', translation: 'Птица', category: 'animals' },
    { word: 'Fish', translation: 'Рыба', category: 'animals' },
    { word: 'Lion', translation: 'Лев', category: 'animals' },
  ],
  food: [
    { word: 'Apple', translation: 'Яблоко', category: 'food' },
    { word: 'Bread', translation: 'Хлеб', category: 'food' },
    { word: 'Cheese', translation: 'Сыр', category: 'food' },
    { word: 'Coffee', translation: 'Кофе', category: 'food' },
    { word: 'Water', translation: 'Вода', category: 'food' },
  ],
  travel: [
    { word: 'Airport', translation: 'Аэропорт', category: 'travel' },
    { word: 'Hotel', translation: 'Отель', category: 'travel' },
    { word: 'Ticket', translation: 'Билет', category: 'travel' },
    { word: 'Map', translation: 'Карта', category: 'travel' },
    { word: 'Train', translation: 'Поезд', category: 'travel' },
  ],
  tech: [
    { word: 'Computer', translation: 'Компьютер', category: 'tech' },
    { word: 'Phone', translation: 'Телефон', category: 'tech' },
    { word: 'Internet', translation: 'Интернет', category: 'tech' },
    { word: 'Keyboard', translation: 'Клавиатура', category: 'tech' },
    { word: 'Screen', translation: 'Экран', category: 'tech' },
  ],
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

    if (isCorrect) {
      setUserStats({ correct: userStats.correct + 1, total: userStats.total + 1 });
    } else {
      setUserStats({ ...userStats, total: userStats.total + 1 });
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Учи Слова
            </h1>
            <p className="text-xl text-gray-600">Изучай языки легко и весело</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((cat, index) => (
              <Card
                key={cat.id}
                className="p-6 cursor-pointer hover:scale-105 transition-all duration-300 border-2 hover:shadow-2xl animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => selectCategory(cat.id)}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-4 mx-auto`}>
                  <Icon name={cat.icon as any} className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-center">{cat.name}</h3>
                <p className="text-center text-gray-500 mt-2">{wordsData[cat.id].length} слов</p>
              </Card>
            ))}
          </div>

          {userStats.total > 0 && (
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
              <Progress value={(userStats.correct / userStats.total) * 100} className="h-3" />
            </Card>
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button variant="outline" onClick={goHome} className="gap-2">
              <Icon name="ArrowLeft" size={20} />
              Назад
            </Button>
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category?.gradient} flex items-center justify-center`}>
                <Icon name={category?.icon as any} className="text-white" size={16} />
              </div>
              <span className="font-semibold">{category?.name}</span>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Слово {currentWordIndex + 1} из {words.length}</span>
              <span>{Math.round(((currentWordIndex + 1) / words.length) * 100)}%</span>
            </div>
            <Progress value={((currentWordIndex + 1) / words.length) * 100} className="h-2" />
          </div>

          <Card 
            className="p-12 mb-8 cursor-pointer hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-purple-50 border-2"
            onClick={() => setShowTranslation(!showTranslation)}
          >
            <div className="text-center">
              <div className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {currentWord.word}
              </div>
              {showTranslation ? (
                <div className="text-4xl text-gray-600 animate-fade-in">
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
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <Button variant="outline" onClick={() => setScreen('study')} className="gap-2">
              <Icon name="X" size={20} />
              Отмена
            </Button>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow">
              <Icon name="Target" size={20} className="text-blue-500" />
              <span className="font-semibold">{currentQuestion + 1}/{words.length}</span>
            </div>
          </div>

          <div className="mb-6">
            <Progress value={((currentQuestion + 1) / words.length) * 100} className="h-2" />
          </div>

          <Card className="p-12 mb-8 bg-gradient-to-br from-white to-blue-50 border-2">
            <div className="text-center">
              <p className="text-gray-600 mb-4">Выбери правильный перевод:</p>
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
                className="h-16 text-xl hover:scale-105 transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white hover:border-transparent"
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