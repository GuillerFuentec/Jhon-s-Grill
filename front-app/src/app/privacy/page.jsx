import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      <section className="py-16 bg-white min-h-screen">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="title-font text-3xl md:text-4xl font-bold text-center text-red-600 mb-12">
            Política de Privacidad
          </h1>

          <div className="prose prose-lg max-w-none text-black">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Introducción
            </h2>
            <p className="mb-6">
              En Jhon's Backyard Grill, respetamos tu privacidad y nos
              comprometemos a proteger tus datos personales. Esta política de
              privacidad explica cómo recopilamos, usamos, divulgamos y
              salvaguardamos tu información cuando visitas nuestro sitio web.
            </p>

            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Información que Recopilamos
            </h2>
            <p className="mb-6">
              Podemos recopilar información sobre ti de varias maneras:
            </p>

            <h3 className="text-xl font-bold text-red-600 mb-3">
              Información que Proporcionas Voluntariamente
            </h3>
            <p className="mb-4">
              Cuando completas formularios en nuestro sitio web (como
              formularios de contacto, reservas o suscripción a newsletter),
              proporcionas información como:
            </p>
            <ul className="list-disc list-inside mb-4 text-black">
              <li>Nombre completo</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono</li>
              <li>Dirección postal</li>
              <li>Preferencias y comentarios</li>
            </ul>

            <h3 className="text-xl font-bold text-red-600 mb-3">
              Información Recopilada Automáticamente
            </h3>
            <p className="mb-4">
              Cuando navegas por nuestro sitio web, recopilamos automáticamente
              cierta información:
            </p>
            <ul className="list-disc list-inside mb-6 text-black">
              <li>Dirección IP</li>
              <li>Tipo y versión del navegador</li>
              <li>Sistema operativo</li>
              <li>Páginas visitadas y tiempo pasado en cada página</li>
              <li>Información de referencia</li>
            </ul>

            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Cómo Usamos Tu Información
            </h2>
            <p className="mb-6">
              Utilizamos la información recopilada para los siguientes
              propósitos:
            </p>
            <ul className="list-disc list-inside mb-6 text-black">
              <li>Proporcionar, operar y mantener nuestro sitio web</li>
              <li>Mejorar, personalizar y expandir nuestro sitio web</li>
              <li>Entender y analizar cómo usas nuestro sitio web</li>
              <li>Desarrollar nuevos productos, servicios y funcionalidades</li>
              <li>Responder a tus consultas y solicitudes de soporte</li>
              <li>
                Enviarte información de marketing (solo con tu consentimiento)
              </li>
              <li>Cumplir con obligaciones legales</li>
            </ul>

            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Compartición de Información
            </h2>
            <p className="mb-6">
              No vendemos, intercambiamos ni transferimos tu información
              personal a terceros sin tu consentimiento, excepto en los
              siguientes casos:
            </p>
            <ul className="list-disc list-inside mb-6 text-black">
              <li>
                <strong>Proveedores de servicios:</strong> Con empresas que nos
                ayudan a operar nuestro sitio web (hosting, análisis, etc.)
              </li>
              <li>
                <strong>Requisitos legales:</strong> Cuando la ley nos obliga a
                divulgar información
              </li>
              <li>
                <strong>Protección de derechos:</strong> Para proteger nuestros
                derechos, privacidad, seguridad o propiedad
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Seguridad de Datos
            </h2>
            <p className="mb-6">
              Implementamos medidas de seguridad técnicas, administrativas y
              físicas para proteger tu información personal contra acceso no
              autorizado, alteración, divulgación o destrucción. Sin embargo,
              ningún método de transmisión por internet es 100% seguro.
            </p>

            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Derechos del Usuario
            </h2>
            <p className="mb-6">Tienes derecho a:</p>
            <ul className="list-disc list-inside mb-6 text-black">
              <li>Acceder a tus datos personales</li>
              <li>Corregir información inexacta</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Oponerme al procesamiento de tus datos</li>
              <li>Retirar tu consentimiento en cualquier momento</li>
            </ul>

            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Retención de Datos
            </h2>
            <p className="mb-6">
              Conservamos tus datos personales solo durante el tiempo que sea
              necesario para los propósitos para los cuales fueron recopilados,
              o según lo requiera la ley. Cuando ya no necesitemos tus datos,
              los eliminaremos de forma segura.
            </p>

            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Enlaces a Terceros
            </h2>
            <p className="mb-6">
              Nuestro sitio web puede contener enlaces a sitios web de terceros.
              No somos responsables de sus prácticas de privacidad. Te
              recomendamos revisar la política de privacidad de cualquier sitio
              web antes de proporcionar tu información personal.
            </p>

            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Cambios a Esta Política
            </h2>
            <p className="mb-6">
              Nos reservamos el derecho de modificar esta política de privacidad
              en cualquier momento. Los cambios entrarán en vigor inmediatamente
              después de su publicación. Tu uso continuado del sitio web indica
              tu aceptación de los cambios.
            </p>

            <h2 className="text-2xl font-bold text-red-600 mb-4">Contacto</h2>
            <p className="mb-6">
              Si tienes preguntas sobre esta política de privacidad o nuestras
              prácticas de privacidad, puedes contactarnos:
            </p>
            <div className="bg-amber-100 p-6 rounded-lg">
              <p className="mb-2">
                <strong>Jhon's Backyard Grill</strong>
              </p>
              <p className="mb-2">17604 Davenport Rd, Dallas, TX 75252</p>
              <p className="mb-2">
                <a
                  href="tel:+19727331439"
                  className="text-red-600 hover:underline"
                >
                  +1 (972) 733-1439
                </a>
              </p>
              <p>
                <a href="/contact" className="text-red-600 hover:underline">
                  Formulario de contacto
                </a>
              </p>
            </div>

            <p className="mt-8 pt-6 border-t border-gray-300 text-sm text-gray-600">
              Última actualización: {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
