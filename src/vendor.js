import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

window.WebflowGsapVendor = {
  gsap,
  ScrollTrigger,
  SplitType,
};

export { gsap, ScrollTrigger, SplitType };
