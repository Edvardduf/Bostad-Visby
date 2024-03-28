import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

{/* TODO So a lot of formating of the text to be done. Also some sort of searchbar */}

function Root() {
  return (
    <div >
      <div className="pt-5">
      <Navbar />
      </div>
      <section
        className="w-full pt-6 md:pt-1 lg:pt-1"
        style={{
          background:
            "linear-gradient(to bottom, #FFFFFF, #EBF5FB, #E8F6F3, #D0ECE7, #D1F2EB, #EAFAF1 )",
        }}
      >
        {/* Hero Image Section */}
        <div className="container mx-auto">
          <img
            alt="Hero"
            className="mx-auto mt-4 aspect-[4/2] overflow-hidden rounded-t-xl rounded-b-md object-cover shadow-2xl max-w-full h-auto"
            src="https://bostadvisby.se/images/almedalen-visby.jpg"
          />
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="bg-white h-[55vh] flex flex-col justify-center overflow-hidden  bg-gradient-to-b from-[#EAFAF1] to-[#CBD5E1]">
        <div className="container flex flex-col md:flex-row items-center justify-between px-6 mx-auto space-y-4 md:space-y-0">
          <div className="md:w-4/5 flex justify-center md:justify-start md:pr-4">
            <img
              src="https://bostadvisby.se/images/gotland.jpg"
              alt=""
              className="h-[45vh] md:h-auto md:w-3/4 object-cover rounded-sm"
            />
          </div>
          <div className="flex flex-col md:w-1/2 items-center md:items-start space-y-2 md:space-y-4 max-w-full h-auto ">
            <h1 className="text-3xl md:text-4xl font-bold md:text-left leading-snug">
              Vill ni lyckas med er Almedalsvecka? Vi hjälper er hitta er bas!
            </h1>
            <p className="text-black md:text-left leading-snug max-w-xl">
              En bra bas för era medarbetare är en förutsättning för att ni
              skall lyckas med just er satsning under Almedalsveckan! Och kanske
              behöver ni även hitta en mötesplats i anslutning till ert boende?
              Vi har flest objekt att välja på! Skulle något intressera er så
              kollar vi med värden om de vill hyra ut även nästa sommar.
              Objekten uppdateras efterhand under hösten.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 - Flipped Image and Text */}
      <section
        className="h-[55vh] flex flex-col justify-center overflow-hidden"
        style={{
          background:
          "linear-gradient(to bottom, #CBD5E1, #E0E7FF, #FFE4D9)",
        }}
      >
        <div className="container flex flex-col md:flex-row items-center justify-between px-6 mx-auto space-y-4 md:space-y-0 max-w-full h-auto">
          <div className="flex flex-col md:w-1/2 items-center md:items-end space-y-2 md:space-y-4 md:pl-4">
            <h1 className="text-3xl md:text-4xl font-bold md:text-right leading-snug">
              5 TJÄNSTER SOM GER ER EN TRYGG BOKNING SAMT SMIDIG PROCESS
            </h1>
            <p className="text-black md:text-right leading-snug max-w-xl">
              1. Se till att ert boende är tillgängligt när ni kommer: Vi
              använder smidiga och säkra elektroniska avtal signerade med
              signatur av parterna genom Scrive.
              <br />
              2. Slipp betalning till hyresvärdens privatkonto: Bostad Visby
              skickar ordentligt fakturaunderlag via e-faktura, mail eller via
              post.
              <br />
              3. Intygat med Bank-id: Korrekta objektsbeskrivningar, intygade av
              värdarna.
              <br />
              4. Intygat med Bank-id: Värden förbinder sig att följa städmanual
              innan vi betalar ut era pengar.
              <br />
              5. Alla hyresvärdar är försäkrade med Berkley Insurance
              Trygghetsförsäkring.{" "}
            </p>
          </div>
          <div className="md:w-2/3 flex justify-center md:justify-end md:pl-4">
            <img
              src="https://hansaevent.se/wp-content/uploads/2021/04/Visby-1024x576.jpg"
              alt=""
              className="h-[45vh] md:h-auto md:w-5/6 object-cover rounded-sm"
            />
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="bg-white h-[55vh] flex flex-col justify-center overflow-auto bg-gradient-to-b from-[#FFE4D9] to-white " >
        {/* Repeat the structure of the main content section here */}
        <div className="container flex flex-col md:flex-row items-center justify-between px-6 mx-auto space-y-4 md:space-y-0 max-w-full h-auto ">
          <div className="md:w-4/6 flex justify-center md:justify-start md:pr-4">
            <img
              src="https://d13gofjvlwna3m.cloudfront.net/uploads/2021/05/rg_lergrav-scaled.jpg?auto=format%2Ccompress&format=lossless&q=60"
              alt=""
              className="h-[45vh] md:h-auto md:w-3/4 object-cover rounded-sm"
            />
          </div>
          <div className="flex flex-col md:w-1/2 items-center md:items-start space-y-2 md:space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold md:text-left leading-snug">
              Spara dyrbar arbetstid för ert företag
            </h1>
            <p className="text-black md:text-left leading-snug max-w-xl">
              Att boka genom Bostad Visby är kostnadseffektivt: Kom nära
              Almedalen eller bo en bit bort för att spara pengar? Vi har
              hundratlas objekt att välja på! Vet ni inte vilket ni skall ta? Vi
              hjälper er. Maila oss direkt! Lägg ingen tid på att skriva avtal
              eller anlita advokat vi har färdiga mallar för hyresavtal i
              Scrive. Avtalen är beprövade och processen har slipats på genom
              tusentals bokningar sedan Almedalsveckan 2016. Almedalsveckan 2024 planeras att hållas under vecka
              26.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4 */}
      <section
  className="h-[55vh] flex flex-col justify-between overflow-hidden"
  style={{
    background:
      "linear-gradient(to bottom, #FFFFFF , #D6E6F2, #F3E2E7, #F3E6F5)",
  }}
>
  <div className="container flex flex-col md:flex-row items-center justify-between px-6 mx-auto space-y-4 md:space-y-0 pt-6 max-w-full h-auto">
    <div className="flex flex-col md:w-1/2 items-center md:items-end space-y-2 md:space-y-4 md:pl-4">
      <h1 className="text-4xl md:text-3xl font-bold md:text-right leading-normal">
        Funderar ni på att hyra ut under Almedalsveckan? <br />Vi har kunder
        till ert boende!
      </h1>
      <p className="text-black md:text-right leading-snug md:max-w-2xl"> {/* Just test formoting of text*/}
        Vi har en stor databas med tidigare kunder, dvs organisationer som
        medverkat under Almedalsveckan i Visby de senaste åren. <p className="pt-5"> Vi
        annonserar även så ni slipper att göra det. Ni slipper dessutom ha
        direktkontakt med hyresgästen och behöver inte förhandla eller
        själva skriva ihop ett kontrakt. Vi hjälper er med faktureringen
        och kan ge bistå att kolla upp skatterättsliga frågor med
        Skatteverket för er räkning. Vet ni inte vilket pris ni kan ta? </p>
        <p className="pt-6">
        Det ordnar vi! Vi erbjuder gratis värdering om ni funderar på att
        hyra ut. Ingen förpliktelse att hyra ut med oss. Vi hjälper er med
        skatterättsliga frågor och fakturering. Genom våra
        samarbetspartners kan vi erbjuda er städtjänst inför
        Almedalsveckan.</p>
      </p>
    </div>
    <div className="md:w-4/6 flex justify-center md:justify-end md:pl-4 overflow-hidden">
      <img
        src="https://www.stadtillstrand.se/wp-content/uploads/2021/05/visby-gotland-skymning.jpg"
        alt=""
        className="h-[25vh] md:h-auto md:w-3/4 object-cover rounded-sm"
      />
    </div>
  </div>
</section>
<Footer></Footer>
    </div>
  );
}

export default Root;
