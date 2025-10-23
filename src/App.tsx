import { useState } from 'react';
import { Button } from './components/ui/button';
import { Textarea } from './components/ui/textarea';
import { Card } from './components/ui/card';
import { ArrowLeftRight, Copy, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { convertToTraditional as toTraditional, convertToSimplified as toSimplified } from './utils/converter';

export default function App() {
  const [simplifiedText, setSimplifiedText] = useState('');
  const [traditionalText, setTraditionalText] = useState('');

  // 简体转繁体
  const convertToTraditional = () => {
    if (!simplifiedText.trim()) {
      toast.error('请输入简体中文文本');
      return;
    }
    const result = toTraditional(simplifiedText);
    setTraditionalText(result);
    toast.success('转换成功');
  };

  // 繁体转简体
  const convertToSimplified = () => {
    if (!traditionalText.trim()) {
      toast.error('请输入繁体中文文本');
      return;
    }
    const result = toSimplified(traditionalText);
    setSimplifiedText(result);
    toast.success('转换成功');
  };

  // 双向转换
  const swapTexts = () => {
    if (!simplifiedText.trim() && !traditionalText.trim()) {
      toast.error('请先输入文本');
      return;
    }
    const temp = simplifiedText;
    setSimplifiedText(traditionalText);
    setTraditionalText(temp);
  };

  // 复制文本
  const copyToClipboard = (text: string, type: string) => {
    if (!text.trim()) {
      toast.error('没有可复制的内容');
      return;
    }
    navigator.clipboard.writeText(text);
    toast.success(`${type}已复制到剪贴板`);
  };

  // 清空所有文本
  const clearAll = () => {
    setSimplifiedText('');
    setTraditionalText('');
    toast.success('已清空所有内容');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* 标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            中文繁简转换工具
          </h1>
          <p className="text-muted-foreground">
            支持简体中文与繁体中文互相转换
          </p>
        </div>

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* 简体中文输入区 */}
          <Card className="p-4 md:p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-blue-600">简体中文</h2>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(simplifiedText, '简体文本')}
                  className="h-8 w-8"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSimplifiedText('')}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Textarea
              value={simplifiedText}
              onChange={(e) => setSimplifiedText(e.target.value)}
              placeholder="请输入简体中文..."
              className="min-h-[300px] md:min-h-[400px] resize-none"
            />
            <div className="mt-4 flex gap-2">
              <Button
                onClick={convertToTraditional}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                转换为繁体
              </Button>
            </div>
          </Card>

          {/* 繁体中文输入区 */}
          <Card className="p-4 md:p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-indigo-600">繁體中文</h2>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(traditionalText, '繁體文本')}
                  className="h-8 w-8"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTraditionalText('')}
                  className="h-8 w-8"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <Textarea
              value={traditionalText}
              onChange={(e) => setTraditionalText(e.target.value)}
              placeholder="請輸入繁體中文..."
              className="min-h-[300px] md:min-h-[400px] resize-none"
            />
            <div className="mt-4 flex gap-2">
              <Button
                onClick={convertToSimplified}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                转换为简体
              </Button>
            </div>
          </Card>
        </div>

        {/* 底部操作按钮 */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={swapTexts}
            variant="outline"
            className="sm:w-auto"
          >
            <ArrowLeftRight className="mr-2 h-4 w-4" />
            交换文本
          </Button>
          <Button
            onClick={clearAll}
            variant="outline"
            className="sm:w-auto"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            清空全部
          </Button>
        </div>

        {/* 使用说明 */}
        <Card className="mt-8 p-4 md:p-6 bg-white/50">
          <h3 className="mb-3">使用说明</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li>• 在左侧输入简体中文，点击"转换为繁体"按钮即可转换</li>
            <li>• 在右侧输入繁体中文，点击"转换为简体"按钮即可转换</li>
            <li>• 点击复制图标可将文本复制到剪贴板</li>
            <li>• 点击垃圾桶图标可清空对应区域的文本</li>
            <li>• 点击"交换文本"可将左右两侧的文本互换</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
