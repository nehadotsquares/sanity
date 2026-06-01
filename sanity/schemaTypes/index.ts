import { navigation } from "./settings/navigation";
import { footer } from "./settings/footer";
import { menu } from "./settings/menu";
import post from './post'
import page from './page'
import homePage from "./homePage";
import contactSubmission from "./contactSubmission";
import platformPage from "./platformPage";
import heroSection from "./sections/platform/heroSection";
import featureSection from "./sections/platform/featureSection";
import testSection from "./sections/platform/testSection";
import resultSection from "./sections/platform/resultSection";
import solutionSection from "./sections/platform/solutionSection";
import singleAgentSection from "./sections/platform/singleAgentSection";
import designedSection from "./sections/platform/designedSection";
import productionSection from "./sections/platform/productionSection";
import securitySection from "./sections/platform/securitySection";
import careerPage from "./careerPage";
import job from "./documents/job";
import richText from "./objects/richText";
import jobApplication from "./jobApplication";
import department from "./department";

export const schemaTypes = [navigation, footer, menu, homePage,
    platformPage, heroSection, featureSection, testSection, resultSection, solutionSection, singleAgentSection, designedSection, productionSection, securitySection,
    page, post, contactSubmission,
    careerPage, department, job, richText, jobApplication, 
]
