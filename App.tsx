
import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Cpu, LayoutGrid, Wrench, Code2, 
  Github, Linkedin, Mail, ExternalLink, 
  ChevronRight, BookOpen, Home, Zap,
  MessageSquare, X, Send, Loader2, Award, School
} from 'lucide-react';
import { PROJECTS, SKILL_CATEGORIES } from './constants';
import { getChatResponse } from './services/geminiService';
import { ChatMessage } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isTyping]);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;

    const userMsg = chatInput.trim();
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const response = await getChatResponse(userMsg, chatHistory);
    
    setIsTyping(false);
    setChatHistory(prev => [...prev, { role: 'model', text: response || '' }]);
  };

  const NavItem = ({ id, label, icon: Icon }: { id: string, label: string, icon: any }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all ${
        activeTab === id 
        ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-600/30' 
        : 'hover:bg-white/5 text-slate-400'
      }`}
    >
      <Icon size={18} />
      <span className="font-medium text-sm hidden md:inline">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen pb-20 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 glass-panel px-4 py-3 rounded-full flex items-center space-x-1 md:space-x-4">
        <NavItem id="home" label="About" icon={LayoutGrid} />
        <NavItem id="projects" label="Projects" icon={Terminal} />
        <NavItem id="skills" label="Skills" icon={Cpu} />
        <NavItem id="education" label="Education" icon={School} />
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 pt-32">
        {activeTab === 'home' && (
          <div className="space-y-16 animate-in fade-in duration-700">
            <section className="text-center md:text-left grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium">
                  Available for Internships
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                  Hi, I'm <span className="gradient-text">Lina</span>
                </h1>
                <p className="text-xl md:text-2xl text-slate-400 font-medium">
                  Level 2 Computer Engineering Student
                </p>
                <p className="text-lg text-slate-500 leading-relaxed max-w-xl">
                  A highly motivated engineer focused on software development and embedded systems. 
                  Passionate about applying OOP principles and designing IoT solutions with 
                  microcontrollers like the ESP32.
                </p>
                <div className="flex flex-wrap gap-4 pt-4 justify-center md:justify-start">
                  <a href="#" className="flex items-center space-x-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors">
                    <Mail size={18} />
                    <span>Contact Me</span>
                  </a>
                  <div className="flex space-x-2">
                    <button className="p-3 glass-panel rounded-xl hover:border-indigo-500/50 transition-all">
                      <Github size={20} />
                    </button>
                    <button className="p-3 glass-panel rounded-xl hover:border-indigo-500/50 transition-all">
                      <Linkedin size={20} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-4 bg-indigo-500/20 rounded-3xl blur-2xl group-hover:bg-indigo-500/30 transition-all"></div>
                <div className="relative glass-panel rounded-3xl overflow-hidden aspect-square border-2 border-indigo-500/10">
                   <img src="https://picsum.photos/seed/lina-dev/800/800" alt="Lina" className="w-full h-full object-cover opacity-80" />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Projects Section */}
        {activeTab === 'projects' && (
          <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-500">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">Featured Projects</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                Demonstrating my ability to build both software architectures and hardware prototypes.
              </p>
            </div>
            <div className="grid gap-8">
              {PROJECTS.map((project) => (
                <div key={project.id} className="glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-indigo-500/30 transition-all group flex flex-col md:flex-row">
                  <div className="md:w-1/3 h-64 md:h-auto overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-8 flex-1 space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                         <span className="text-indigo-400 text-sm font-bold uppercase tracking-widest">{project.subtitle}</span>
                         <div className="flex space-x-2">
                            {project.tech.map(t => (
                              <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 text-xs text-slate-400 border border-white/10">{t}</span>
                            ))}
                         </div>
                      </div>
                      <h3 className="text-2xl font-bold">{project.title}</h3>
                      <p className="text-slate-400">{project.description}</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 pt-4">
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold flex items-center space-x-2 text-slate-300">
                          <Code2 size={16} />
                          <span>Implementation</span>
                        </h4>
                        <ul className="space-y-2">
                          {project.implementation.map((item, idx) => (
                            <li key={idx} className="text-sm text-slate-500 flex items-start space-x-2">
                              <ChevronRight size={14} className="mt-0.5 text-indigo-500 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-sm font-bold flex items-center space-x-2 text-slate-300">
                          <Zap size={16} />
                          <span>Results</span>
                        </h4>
                        <p className="text-sm text-slate-500 leading-relaxed italic border-l-2 border-indigo-500/30 pl-4 py-1">
                          "{project.results}"
                        </p>
                        <div className="pt-4">
                           <button className="flex items-center space-x-2 text-indigo-400 font-bold text-sm hover:text-indigo-300 transition-colors">
                              <span>View Project on GitHub</span>
                              <ExternalLink size={14} />
                           </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {activeTab === 'skills' && (
          <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-500">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold">Technical Stack</h2>
              <p className="text-slate-500 max-w-2xl mx-auto">
                My core expertise across languages, embedded systems, and development tools.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {SKILL_CATEGORIES.map((cat) => {
                // Map icons from constants to Lucide icons
                const Icon = cat.icon === 'Terminal' ? Terminal : 
                             cat.icon === 'Cpu' ? Cpu : 
                             cat.icon === 'LayoutGrid' ? LayoutGrid : Wrench;
                return (
                  <div key={cat.name} className="glass-panel p-8 rounded-3xl border border-white/5 hover:border-indigo-500/30 transition-all space-y-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                      <Icon size={24} />
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold">{cat.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map(s => (
                          <span key={s} className="px-3 py-1 rounded-full bg-white/5 text-xs text-slate-400 border border-white/10">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Education Section */}
        {activeTab === 'education' && (
          <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-500">
             <div className="text-center space-y-4">
                <h2 className="text-4xl font-bold">Academic Journey</h2>
                <p className="text-slate-500 max-w-2xl mx-auto">
                  Foundation and milestones in my computer engineering path.
                </p>
              </div>
              
              <div className="max-w-3xl mx-auto space-y-8">
                <div className="glass-panel p-8 rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 text-indigo-500/10">
                    <School size={120} />
                  </div>
                  <div className="relative z-10 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-indigo-400">Computer Engineering</h3>
                        <p className="text-lg text-slate-300">Level 2 Student</p>
                      </div>
                      <span className="px-3 py-1 bg-white/5 rounded-full text-sm font-mono text-slate-400">Current</span>
                    </div>
                    <p className="text-slate-500">Focusing on high-level software architectures and real-time embedded systems interfacing.</p>
                    <div className="pt-4 grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Key Coursework</h4>
                        <ul className="text-sm text-slate-500 space-y-1">
                          <li>• Programming I & II</li>
                          <li>• Data Structures & Algorithms</li>
                          <li>• Digital Logic Design</li>
                          <li>• Microprocessor Systems</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Achievements</h4>
                        <ul className="text-sm text-slate-500 space-y-1">
                          <li>• Consistent Top Performance</li>
                          <li>• Dean's List (Expected)</li>
                          <li>• Engineering Society Member</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="glass-panel p-6 rounded-2xl flex items-center space-x-4">
                    <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                      <Award size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold">IoT Specialist</h4>
                      <p className="text-sm text-slate-500">Hardware certification</p>
                    </div>
                  </div>
                  <div className="glass-panel p-6 rounded-2xl flex items-center space-x-4">
                    <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                      <BookOpen size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold">OOP Expert</h4>
                      <p className="text-sm text-slate-500">Software design patterns</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-32 py-12 border-t border-white/5 text-center text-slate-500">
        <p className="text-sm">© 2024 Lina • Computer Engineering Portfolio • Built with Gemini AI</p>
      </footer>

      {/* Floating Chat Assistant */}
      <div className={`fixed bottom-8 right-8 z-[100] transition-all transform duration-300 ${isChatOpen ? 'w-80 md:w-96' : 'w-16 h-16'}`}>
        {isChatOpen ? (
          <div className="bg-[#121214] border border-indigo-500/30 rounded-3xl shadow-2xl flex flex-col h-[500px] overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 bg-indigo-600/10 border-b border-indigo-500/20 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white">
                  <Zap size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Lina's Assistant</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="p-1 hover:bg-white/5 rounded-lg text-slate-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatHistory.length === 0 && (
                <div className="text-center py-10 space-y-4">
                   <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto text-indigo-400">
                      <MessageSquare size={24} />
                   </div>
                   <p className="text-sm text-slate-500 px-6">
                      Hi! I'm Lina's AI assistant. Ask me anything about her C# Book System or the Smart Home project!
                   </p>
                   <div className="flex flex-wrap gap-2 justify-center px-4">
                      {['IoT Project?', 'Skills?', 'Book System?'].map(q => (
                        <button 
                          key={q} 
                          onClick={() => {
                            setChatInput(q);
                            setTimeout(() => handleSendMessage(), 10);
                          }}
                          className="text-[10px] bg-white/5 border border-white/10 px-2 py-1 rounded-full text-slate-400 hover:bg-indigo-500/10 hover:border-indigo-500/20 transition-all"
                        >
                          {q}
                        </button>
                      ))}
                   </div>
                </div>
              )}
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white/5 text-slate-300 rounded-tl-none border border-white/5'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/5 p-3 rounded-2xl rounded-tl-none">
                    <Loader2 size={16} className="animate-spin text-indigo-400" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-black/40 border-t border-white/5">
              <div className="relative">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me a question..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-indigo-500/50 transition-all"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim() || isTyping}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-indigo-500 hover:text-indigo-400 disabled:opacity-50 transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="w-full h-full rounded-full bg-indigo-600 shadow-xl shadow-indigo-600/20 flex items-center justify-center text-white hover:scale-110 transition-transform relative group"
          >
            <div className="absolute -inset-1 bg-indigo-500 rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
            <MessageSquare size={28} className="relative z-10" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-[#0a0a0c] rounded-full"></div>
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
