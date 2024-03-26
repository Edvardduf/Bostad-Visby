import React from "react";
import RentersForm from "../components/RenterForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ListingForm from "../components/ListingsForm";

function RentOut() {
  return (
    <div>
      <Navbar></Navbar>
      <div className=" py-8"         style={{
          background:
            "linear-gradient(to bottom, #FFFFFF ,#EAFAF1 , #FFFFFF ,#EBF5FB, #E8F8F5, #D0ECE7, #EAFAF1 )",
        }} >
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
            <ListingForm />
          </div>
          <div className="w-full lg:w-1/2 px-4">
            <div className="ml-4 prose prose-lg max-w-prose" >
            <div className="ml-4 space-y-6">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">
                Varför skall du hyra ut med Bostad Visby?
              </h2>
              <div>
                <h3 className="font-bold text-lg">1. Vi hjälper dig värdera din bostad</h3><p className=" text-lg">Bostad Visby
                har lång erfarenhet gällande prissättningen av din bostad. Vi
                vet hur mycket du kan ta och samtidigt få din bostad i god tid.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg">
                 2. Vi hjälper dig hitta hyresgäster som betalar bra
                </h3> <p className=" text-lg" >
                Bostad Visby har en databas med hundratals företag som hyrt
                genom oss de senaste 3 åren. Vi investerar en stor del av de
                pengarna vi får in på marknadsföring på exempelvis Google och
                sociala medier. Våra kunder betalar bra hyra för ditt objekt.
                Med Bostad Visby slipper du allt jobb och får mer kvar i efter
                vi dragit vår provision. 95% av alla som hyr genom oss
                representerar ett företag eller en organisation.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg">3. Du är försäkrad under uthyrningen</h3><p className=" text-lg"> Bostad Visby
                strävar alltid efter att hitta en bra hyresgäst till er. Vi hyr
                enbart ut till företag eller äldre vuxna eller familjer. Skulle
                olyckan vara framme så omfattas alla våra värdar av vår
                tilläggsförsäkring till din hemförsäkring. <br />
                <a
                  href="https://bostadvisby.se/Stugbranshenstrygghetsf%C3%B6rs%C3%A4kring_broschyr_2018.pdf"
                  className="text-blue-400 hover:text-blue-600"
                >
                  Här kan du läsa mer om den försäkring du får som vår värd här.
                </a>
                </p>
              </div>
              <div >
                <h3 className="font-bold text-lg"> 4. Vi hjälper dig med avtalsskrivningen</h3><p className=" text-lg">Bostad
                Visby har utvecklat en process där det är mycket enkelt för
                parterna att träffa en överenskommelse. Allt sker enkelt direkt
                på skärmen utan att du behöver leta avtal, scanna, faxa eller
                posta papper.</p> 
              </div>
              <div>
                <h3 className="font-bold text-lg">5. Vi hjälper med faktureringen</h3> <p className=" text-lg"> Nästan alla
                företagskunder föredrar att betala via faktura. När vi hittat en
                hyresgäst ser till att du får betalt.</p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default RentOut;
