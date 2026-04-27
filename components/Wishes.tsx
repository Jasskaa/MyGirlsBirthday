import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, Flower2, Leaf } from 'lucide-react';

const Wishes: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [error, setError] = useState(false);

  const handleOpenAttempt = () => {
    if (isOpen) return;
    setShowPasswordPrompt(true);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'MahiXula') {
      setShowPasswordPrompt(false);
      setIsOpen(true);
      // Wait for envelope flap animation to finish before expanding the paper
      setTimeout(() => {
        setIsExpanded(true);
      }, 800);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#fff0f3]">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-pink-and-white-clouds-in-the-sky-34545-large.mp4" type="video/mp4" />
      </video>

      {/* Floating Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: "110vh", opacity: 0, scale: 0.5 }}
            animate={{ 
              y: "-10vh", 
              opacity: [0, 1, 1, 0],
              x: `${Math.random() * 100}vw`,
              rotate: 360
            }}
            transition={{ 
              duration: Math.random() * 15 + 10, 
              repeat: Infinity, 
              delay: Math.random() * 10,
              ease: "linear"
            }}
            className="absolute text-pink-300/40"
          >
            {i % 2 === 0 ? <Heart size={Math.random() * 24 + 12} fill="currentColor" /> : <Sparkles size={Math.random() * 20 + 10} />}
          </motion.div>
        ))}
      </div>

      {/* Main Content (Envelope) */}
      <div className="relative z-10 flex flex-col items-center px-4">
        <motion.div 
          className="relative group"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* The Envelope/Card Container */}
          <motion.div 
            className="relative w-80 h-56 md:w-[450px] md:h-[300px] cursor-pointer perspective-1000"
            onClick={handleOpenAttempt}
          >
            {/* Envelope Back/Body */}
            <div className="absolute inset-0 bg-white rounded-xl shadow-2xl border-2 border-pink-100 overflow-hidden">
              {/* Small Preview of Letter (revealed when open) */}
              <motion.div 
                className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center bg-white"
                initial={false}
                animate={{ 
                  y: isOpen ? -20 : 0,
                  opacity: isOpen ? 1 : 0,
                  scale: isOpen ? 1 : 0.9
                }}
                transition={{ duration: 0.6, delay: isOpen ? 0.3 : 0 }}
              >
                <h3 className="text-xl font-serif italic text-pink-500">
                  My Dearest...
                </h3>
              </motion.div>

              {/* Envelope Interior Shadow/Depth */}
              <div className="absolute inset-0 bg-gradient-to-b from-pink-50/50 to-transparent pointer-events-none" />
            </div>

            {/* Envelope Flap (Top) */}
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-pink-100 rounded-t-xl z-30 border-b border-pink-200 shadow-sm origin-top"
              initial={false}
              animate={{ rotateX: isOpen ? -120 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="absolute inset-0 flex items-end justify-center pb-4">
                <div className="w-8 h-8 rounded-full bg-white shadow-inner flex items-center justify-center">
                  <Heart size={14} className="text-pink-400" fill="currentColor" />
                </div>
              </div>
            </motion.div>

            {/* Envelope Front Panels (Visual only) */}
            <div className="absolute inset-0 z-20 pointer-events-none">
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white rounded-b-xl border-t border-pink-50 flex items-center justify-center">
                <AnimatePresence>
                  {!isOpen && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center"
                    >
                      <Heart size={40} className="text-pink-500 animate-pulse" fill="currentColor" />
                      <span className="mt-2 text-[10px] tracking-[0.3em] uppercase text-pink-300 font-bold">Open Me</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Text below the card */}
        <motion.div 
          className="mt-12 text-center"
          animate={{ y: isOpen ? 20 : 0, opacity: isOpen ? 0 : 1 }}
        >
          <p className="text-pink-600 font-serif italic text-lg md:text-xl">
            A special message just for you...
          </p>
          <p className="mt-2 text-pink-400 font-mono text-[10px] tracking-[0.4em] uppercase">
            Click the heart to reveal
          </p>
        </motion.div>
      </div>

      {/* Password Prompt Modal */}
      <AnimatePresence>
        {showPasswordPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-pink-900/40 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl p-8 shadow-2xl w-full max-w-sm border-2 border-pink-100"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mb-6">
                  <Heart className="text-pink-500" fill="currentColor" />
                </div>
                <h3 className="text-2xl font-serif italic text-pink-600 mb-2">Secret Access</h3>
                <p className="text-slate-500 text-sm mb-8">Enter the secret word to read your letter</p>
                
                <form onSubmit={handlePasswordSubmit} className="w-full space-y-4">
                  <div className="relative">
                    <input
                      autoFocus
                      type="password"
                      value={passwordInput}
                      onChange={(e) => setPasswordInput(e.target.value)}
                      placeholder="Enter password..."
                      className={`w-full px-6 py-4 bg-pink-50/50 border-2 rounded-xl outline-none transition-all text-center font-serif text-lg ${
                        error ? 'border-red-400 animate-shake' : 'border-pink-100 focus:border-pink-400'
                      }`}
                    />
                    {error && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute -bottom-6 left-0 right-0 text-red-500 text-[10px] uppercase font-bold tracking-widest"
                      >
                        Incorrect Password
                      </motion.p>
                    )}
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPasswordPrompt(false);
                        setPasswordInput('');
                        setError(false);
                      }}
                      className="flex-1 py-4 text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-slate-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-[2] py-4 bg-pink-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-pink-200 hover:bg-pink-600 transition-colors"
                    >
                      Unlock
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Expanded Paper */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-pink-900/20 backdrop-blur-md"
          >
            <motion.div
              className="relative w-full max-w-3xl h-[85vh] bg-[#fffdfa] shadow-[0_0_50px_rgba(236,19,55,0.15)] rounded-lg p-8 md:p-16 overflow-y-auto border-t-[20px] border-pink-50"
              initial={{ scale: 0.8, y: 100, rotate: -3 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              exit={{ scale: 0.8, y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
            >
              {/* Decorative Corner Flowers/Hearts */}
              <div className="absolute top-0 left-0 p-6 opacity-10 pointer-events-none flex gap-2">
                <Flower2 size={80} className="text-pink-500 -rotate-12" />
                <Leaf size={40} className="text-pink-400 rotate-45 mt-8" />
              </div>
              <div className="absolute bottom-0 right-0 p-6 opacity-10 pointer-events-none flex flex-row-reverse gap-2">
                <Flower2 size={80} className="text-pink-500 rotate-12" />
                <Leaf size={40} className="text-pink-400 -rotate-45 mb-8" />
              </div>

              {/* Elegant Flourish Borders */}
              <div className="absolute top-10 left-10 right-10 bottom-10 border border-pink-100/30 rounded-lg pointer-events-none" />
              <div className="absolute top-12 left-12 right-12 bottom-12 border border-pink-50/20 rounded-lg pointer-events-none" />

              {/* Paper Texture */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
                style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }}
              />

              <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="mb-8"
                >
                  <div className="relative">
                    <Heart size={48} className="text-pink-400" fill="currentColor" />
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute inset-0 bg-pink-400 rounded-full blur-xl"
                    />
                  </div>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-4xl md:text-5xl font-script text-pink-600 mb-12 text-center drop-shadow-sm"
                >
                  For My Manheer
                </motion.h3>

                {/* Elegant Flourish Above Text */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 0.2, scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  className="w-full h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent mb-12"
                />

                <div className="space-y-8 text-slate-800 leading-relaxed text-2xl md:text-3xl font-handwritten text-center px-6 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">

                  <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 }}
                    className="drop-shadow-[0_1px_1px_rgba(255,255,255,1)]"
                  >
                    Holaa Amorrr, si estas llegin aixo, possiblament t’hagui entregat el regal i la pagina. Si, bueno, te logica, no, que t’hagui entregat la pagina, perque segurament posare aquest text en la pagino, o no... Bueno, nose que fare, soc un indecidit, ja sabs. En fi, el que t’anava a dir: FELICITATSSS AMORR MEUUUUU, es el cumple de la meva reina, oleolee. Susposo que et donare el regal uns dies abans/despres del teu cumple, perque el mateix dia sera impossible quedar... OJALA poguessimm quedar el same i pogues portar un pastiss super bonic amb el teu nommmm. Fua, sera mes guay celebrar cumples despres del rokka... Ja veuras, ja no te podras pas queixar llavors. Anem al gra, que jo m’enrollo molt (depen del dia). Jannu, el regal que em vas fer tu em va encantar, va ser el millor regal que m’han fet mai mes, i asobres vam celebrar el cumple, va ser maquissimmm tot, em va encantar. A mes, la tia es va currar una carta de 7 pagines (en quin moment escrius 7 pagines tia? d’on et surtan tantes paraules?). Va ser increible la carta. Poder, desde el dia que me la vas fer, l’haure llegit uns 2-3 cops. Jo, amor, sincerament no soc tan creatiu com tu, jo no se pas escriure tantes paraules... Pero s’intentara. Podria fer com va fer la meva nena de escriure com ha set el nostre recorregut fins avui (desde un punt de vista diferent, amb les meves paraules). Pero he decidit dedicar una mica de text en explicar lu increible que ets com a persona i tan sols parlar de tu. Aviam, resumire bastant, perque si m’haig de posar a parlar de tu, fua, tenim per dies i dies, no acabaria mai. Bueno, comencem a parlar una mica de qui ets — Et dius Manheer, tens 18 anys, vius a angles, ets de mehlanwali, estas cursant informatica, tens moltes amigues, tens un germanet petit... Podria seguir, eh, pero parlem de altres coses — Ara parlarem una mica de com ets — (opinio personal) caus molt be, ets una nena de 10 (per molt que diguis que hi ha moltes nenes com tu, no n’hi ha), ets molt generosa, ets celosa (mola), ets molt guapa (el mes imporant), estas molt bona (y ese culito, amor), ets molt tranquila (...), plores molt, t’enfades molt rapid, ets molt dramebazz, pero sobretott ets molt mona — Ara parlarem dels teus hobbies — t’encanta el color rosa, t’agrada molt vestir (i ami desvestir-te), t’encantan els suits, et flipa escoltar cançons, sempre vols anar de compres, t’agrada molt gastar diners (i despres dir que ahorres molt), t’agrada cuinar... I moltes coses mes. En fi, m’he posat aqui a explicar coses teves com si no et coneguessis. En conclusio, ets la millor. (He fet tot allo per allargar una mica el text, jsjsjsjsj). La veritat podria estar dient tonteries d’aquestes tot el dia, pero no es el cas, almenya avui no. Amor, per si ja has rebut el regal o encara te l’haig de donar, primer de tot, no es gaire cosa, son mes que res petits detalls. La veritat, visc d’aquests petits detalls. Tu ets una noia que sap expressar tot molt be... Jo no tant. Per aixo intento fer mes aquestes coses. Sincerament t’estimo moltissim, amor. Nose pas quant t’estimo, pero t’estimo moltissimm (mes que tu). Bueno, ara que m’he posat una mica romantic i he deixat la tonteria, posare algunas coses maques.
                    <br /><br />
                    Janne, sincerament no m’esperaba mai que tingues novia abans de casar-me. En plan, hu veia molt inutil en el sentit de que, perque haig de tenir relacions amb algu que, si l’andema els pares no accepten, arruinarem de 2 a 4 vides. I sempre triaba el cami façil, que es que els pares em busquin a una i casarme amb ella... Saben com es la gent avui en dia, aixo fa molta por. Jo no vull que l’andema aquesta, despres de haver-nus casat, em digui que tenia un novio i que encara el troba a faltar (em faria molt de mal). Evidentment, si em pases algu aixis, poder m’hu mareixo i m’hu he buscat jo mateix, perque tampoc soc jo molt sau, saps. He parlat amb moltissimes noies, pero mai tu he volgut amagar. Al final, una relacio es basa en la confiança entre un i l’altre. Ah, si, hi ha una cosa en la que si te mentit una mica (No conec a cap altre Manheer, ni de canada ni enlloc). Apart d’aixo, no crec que t’hagui mentit en gaire res. Bueno, el que deia, pues em sentu super afortunat de haver-te conegut. Possiblament, la millor cosa que m’ha passat mai. Em penso casar amb tu, tenir fills amb tu, i morir aprop teu. En nego a dependre de la sort i deixar que els pares em busquin algù. Jo ja he trobat la meva sort, i la veritat, massa sort he tingut. Fare el maxim perque acabem junts. Se que molts cops et molesto molt, et fai enfadar i dic coses que fan mal... El problema es que sempre he sigut aixis, no he tingut gaire contacte femeni i he crescut en aquestes condicions de estar rodejad de nois tot el dia. Jo sentu pena, pero no pietat. Intento sincerament cada cop ser millor amb tu. Suposo que al final del dia haure apres la lliço i suposo que et valorare mes. Jo tu juru que cada dia hu intento mes, pero sempre hi ha algu que s’em escapa. Bueno, amor, nomes dirte que intentare treure la meva millor versio cada dia. A lu millor no sere perfecte en tot, pero no arribare en tal mal punt que tu t’haguis de queixar cada dia de mi amb els teus pares, o que els meus fills arribin a pensar que soc molt mal pare. Donare el maxim de mi. Bueno, deixarem apart aquesta historia emocional perque vull parlar de unaltre tema.
                    <br /><br />
                    Ultimament ens hem barallat molt, ja pot ser per tonteries, malentesos, egoisme... El que volguis. Sincerament, janne, en el moment que estem discutin, molta part del meu cervell deja de funcionar i nomes em surt fer guerra, encara que al final m’arrapenteixi. Jo capaç no discutiria mai amb tu, pues perque t’estimo molt i em fa mal dirte aquestes coses. Pero com be va dir l’einsten, “donde no hay pelea no hay amor” (l’einsten mai va dir aixo). Pero bueno, que al final del dia, per mucho que ens barallem, acabem junts i contents. Ara perque hu hem de solucionar a base de paraules i perdons, viah to badd, tindrem altres maneres...
                    <br /><br />
                    Amor, tenia tantes ganes del teu cumple, que cumpleixes ara en aquests dies, i vai comencar a pensar ideas i fer coses desde finals de Gener. Es que t’estimo massa.
                  </motion.p>
                </div>

                {/* Elegant Flourish Below Text */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 0.2, scaleX: 1 }}
                  transition={{ delay: 1.7, duration: 1 }}
                  className="w-full h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent mt-12 mb-12"
                />

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 }}
                  className="mt-8 flex flex-col items-center gap-6"
                >
                  <div className="flex items-center gap-4 text-pink-500">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Heart size={32} fill="currentColor" />
                    </motion.div>
                    <span className="text-3xl font-script">Forever Yours</span>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                    >
                      <Heart size={32} fill="currentColor" />
                    </motion.div>
                  </div>

                  <p className="text-slate-400 font-mono text-xs tracking-[0.3em] uppercase mb-12">
                    With all my heart
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#ec1337", color: "#fff" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setIsExpanded(false);
                      setIsOpen(false);
                    }}
                    className="px-12 py-4 border-2 border-pink-500 text-pink-500 rounded-full font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-lg hover:shadow-pink-200"
                  >
                     LEIDO
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Extra decorative elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-8 opacity-20">
        <div className="w-px h-32 bg-gradient-to-t from-pink-500 to-transparent" />
        <div className="w-px h-48 bg-gradient-to-t from-pink-500 to-transparent" />
        <div className="w-px h-32 bg-gradient-to-t from-pink-500 to-transparent" />
      </div>
    </div>
  );
};

export default Wishes;
