import { useSpring, animated } from '@react-spring/web';
import { motion } from 'framer-motion';
import { CiLogin } from "react-icons/ci";
import { HiOutlinePencilSquare, HiOutlineUserPlus } from "react-icons/hi2";
import { TbWorldSearch } from "react-icons/tb";
import { ImStatsBars } from "react-icons/im";
import { LuMessageSquare } from "react-icons/lu";

function Main() {
    const fadeIn = useSpring({
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        delay: 200,
    });

    const itemFadeIn = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: 500,
    });

    const buttonHover = {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
    };

    return (
        <div>
            <div
                className="min-h-screen  bg-gradient-to-t from-[#F2f2f2] to-[#6DC093] flex flex-col items-center justify-center p-8 lg:flex-row lg:space-x-8">
                <motion.div
                    className="bg-[#6DC093] py-8 w-full lg:w-1/2 flex flex-col items-center justify-center text-center rounded-xl shadow-lg"
                    initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}}
                    transition={{delay: 0.6, duration: 0.5}}>
                    <img src="/src/assets/logo.jpeg" alt="Logo"
                         className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg mb-6"/>
                    <h1 className="text-2xl px-6 py-4 text-white font-bold lg:text-3xl">
                        ¡Bienvenido a nuestra comunidad de creadores de blogs!
                    </h1>
                    <p className="text-lg text-white lg:text-xl">
                        Donde tus ideas cobran vida y encuentran un hogar digital.
                    </p>
                    <ul className="text-white text-lg list-disc list-inside lg:text-xl mt-4">
                        <li>Crea tu propio blog en cuestión de minutos!</li>
                        <li>Interactúa con otros bloggers</li>
                        <li>Explora blogs de la comunidad!</li>
                    </ul>
                </motion.div>
                <animated.div style={fadeIn}
                              className="bg-white p-10 rounded-xl shadow-xl max-w-3xl text-center w-full lg:w-1/2">
                    <motion.h1 className="text-4xl font-extrabold text-gray-800 mb-6" initial={{opacity: 0}}
                               animate={{opacity: 1}} transition={{delay: 0.2, duration: 0.5}}>
                        ¡Empieza a bloguear hoy mismo!
                    </motion.h1>
                    <motion.h3 className="text-xl text-gray-600 mb-8" initial={{opacity: 0}} animate={{opacity: 1}}
                               transition={{delay: 0.4, duration: 0.5}}>
                        Crea tu blog personal gratis y comparte tus ideas, historias y pasiones con el mundo. Fácil de
                        usar, sin necesidad de conocimientos técnicos.
                    </motion.h3>

                    <div className="font-light text-lg flex flex-col items-center gap-4 my-12">
                        <motion.div className="flex items-center gap-3" style={itemFadeIn}>
                            <HiOutlinePencilSquare className="text-2xl text-[#6DC093]"/>
                            <span>Crea blogs ilimitadamente!</span>
                        </motion.div>
                        <motion.div className="flex items-center gap-3" style={itemFadeIn}>
                            <ImStatsBars className="text-2xl text-[#6DC093]"/>
                            <span>Analiza y puntua los blogs</span>
                        </motion.div>
                        <motion.div className="flex items-center gap-3" style={itemFadeIn}>
                            <LuMessageSquare className="text-2xl text-[#6DC093]"/>
                            <span>Interactua con otros usuarios</span>
                        </motion.div>
                    </div>

                    <div className="flex flex-col items-center gap-6">
                        <motion.a
                            style={itemFadeIn}
                            href="/login"
                            className="w-3/4 py-4 rounded-full bg-[#6DC093] text-white text-center text-lg flex items-center justify-center gap-2 shadow-lg transition-transform"
                            {...buttonHover}
                        >
                            <CiLogin className="text-2xl"/> Inicia sesión con tu cuenta
                        </motion.a>
                        <motion.a
                            style={itemFadeIn}
                            href="/register"
                            className="w-3/4 py-4 rounded-full bg-gray-300 text-black text-center text-lg flex items-center justify-center gap-2 shadow-lg transition-transform"
                            {...buttonHover}
                        >
                            <HiOutlineUserPlus className="text-2xl"/> ¿Aún no tienes cuenta? Regístrate
                        </motion.a>
                        <motion.a
                            style={itemFadeIn}
                            href="/explore"
                            className="w-3/4 py-4 rounded-full bg-gray-300 text-black text-center text-lg flex items-center justify-center gap-2 shadow-lg transition-transform"
                            {...buttonHover}
                        >
                            <TbWorldSearch className="text-2xl"/> Explora los blogs de la comunidad!
                        </motion.a>
                    </div>
                </animated.div>

            </div>
        </div>
    );
}

export default Main;
