import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";

export default function page() {
  return (
    <>
      <Navbar />
      <section className="py-16 bg-white min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="title-font text-3xl md:text-4xl font-bold text-center text-red-600 mb-12">
            Política de Cookies
          </h1>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              ¿Qué son las cookies?
            </h2>
            <p className="mb-6 text-black">
              Las cookies son pequeños archivos de texto que los sitios web
              almacenan en tu dispositivo cuando los visitas. Se utilizan
              ampliamente para hacer que los sitios web funcionen de manera más
              eficiente y para proporcionar información a los propietarios del
              sitio.
            </p>

            <h2 className="text-2xl font-bold text-red-600 mb-4">
              ¿Cómo utilizamos las cookies?
            </h2>
            <p className="mb-6 text-black">
              En Jhon´s Grill Backyard utilizamos cookies para diferentes
              propósitos que se clasifican en las siguientes categorías:
            </p>

            <h3 className="text-xl font-bold text-red-600 mb-3">
              Cookies Necesarias
            </h3>
            <p className="mb-4 text-black">
              Estas cookies son esenciales para el funcionamiento del sitio web
              y no se pueden desactivar. Incluyen cookies de seguridad, balanceo
              de carga y almacenamiento de preferencias esenciales como tu
              consentimiento de cookies.
            </p>

            <h3 className="text-xl font-bold text-red-600 mb-3">
              Cookies Analíticas
            </h3>
            <p className="mb-4 text-black">
              Nos ayudan a entender cómo interactúas con nuestro sitio web
              recopilando información sobre las páginas que visitas y los
              errores que puedas encontrar. Esta información es anónima y no
              recopilamos información personal identificable (PII).
            </p>

            <h3 className="text-xl font-bold text-red-600 mb-3">
              Cookies de Rendimiento
            </h3>
            <p className="mb-4 text-black">
              Miden métricas de Web Vitals como tiempos de carga, fluidez de la
              navegación y estabilidad visual. Esto nos ayuda a optimizar la
              experiencia del usuario.
            </p>

            <h3 className="text-xl font-bold text-red-600 mb-3">
              Cookies de Marketing
            </h3>
            <p className="mb-4 text-black">
              Se utilizan para medir la efectividad de nuestras campañas
              publicitarias. Solo se cargan si das tu consentimiento explícito.
            </p>

            <h2 className="text-2xl font-bold text-red-600 mb-4">Tus opciones</h2>
            <p className="mb-4 text-black">
              Puedes gestionar tus preferencias de cookies en cualquier momento
              haciendo clic en "Preferencias de cookies" en el pie de página de
              nuestro sitio web.
            </p>
            <p className="mb-6 text-black">
              También puedes configurar tu navegador para rechazar cookies,
              aunque esto puede afectar el funcionamiento de algunas partes del
              sitio web.
            </p>

            <h2 className="text-2xl font-bold text-red-600 mb-4">Do Not Track</h2>
            <p className="mb-6 text-black">
              Respetamos la configuración "Do Not Track" de tu navegador. Si
              tienes activada esta opción, automáticamente rechazaremos todas
              las cookies no esenciales.
            </p>

            <h2 className="text-2xl font-bold text-red-600 mb-4">Contacto</h2>
            <p className="mb-6 text-black">
              Si tienes preguntas sobre nuestra política de cookies, puedes
              contactarnos a través de nuestra{" "}
              <a href="contacto.html" className="text-red-600 underline">
                página de contacto
              </a>
              .
            </p>

            <div className="bg-amber-100 p-6 rounded-lg mt-8">
              <p className="text-center">
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transition"
                >
                  Gestionar Preferencias de Cookies
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
