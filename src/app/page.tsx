import Masthead from "@/components/newspaper/Masthead";
import BreakingTicker from "@/components/newspaper/BreakingTicker";
import FrontPageHeadline from "@/components/newspaper/FrontPageHeadline";
import ThreeColumns from "@/components/newspaper/ThreeColumns";
import FeatureStory from "@/components/newspaper/FeatureStory";
import ClassifiedSection from "@/components/newspaper/ClassifiedSection";
import ColophonFooter from "@/components/newspaper/ColophonFooter";
import PrintIntro from "@/components/newspaper/PrintIntro";
import InkCursor from "@/components/newspaper/InkCursor";

export default function Home() {
  return (
    <>
      <PrintIntro />
      <InkCursor />
      <Masthead />
      <BreakingTicker />
      <main>
        <FrontPageHeadline />
        <ThreeColumns />
        <FeatureStory />
        <ClassifiedSection />
      </main>
      <ColophonFooter />
    </>
  );
}
