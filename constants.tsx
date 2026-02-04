
import { Investor, AdaptSystemCard } from './types';

export const INVESTORS: Investor[] = [
  { 
    name: 'General Catalyst', 
    logo: 'https://upload.wikimedia.org/wikipedia/en/0/0d/General_Catalyst_logo.png' 
  },
  { 
    name: 'Y Combinator', 
    logo: 'https://i0.wp.com/www.vccafe.com/wp-content/uploads/2017/09/Y_Combinator_logo_text_wordmark.png?ssl=1' 
  },
  { 
    name: 'Paul Graham', 
    description: 'Founder, Y Combinator', 
    isPerson: true 
  },
  { 
    name: 'Scribble Ventures', 
    logo: 'https://media.licdn.com/dms/image/v2/D4E22AQGLUZf_tkG_4g/feedshare-shrink_800/feedshare-shrink_800/0/1691588615734?e=2147483647&v=beta&t=8aUWPkjVP5Aq3wf2cru2iCGkzJUsRf9tzpeT9MCv1lg' 
  },
  { 
    name: 'SV Angel', 
    logo: 'https://svangel.com/sva-site-image.png' 
  },
  { 
    name: 'Ritual Capital', 
    logo: 'https://ritualcapital.com/wp-content/themes/ritualcapital/images/Ritual-Capital-Logo-Positive.png' 
  },
  { 
    name: 'Beenext', 
    logo: 'https://www.beenext.com/wp-content/uploads/2021/02/beenext_logo_bold.gif' 
  },
  { 
    name: 'Pioneer', 
    logo: 'https://assets.softr-files.com/applications/04869450-6650-4f18-8455-417027c2e7a6/assets/f54fe35b-fa04-4d67-85b8-3b4af8b79c33.png' 
  },
  { 
    name: 'Chris Klaus', 
    description: 'Founder, ISS', 
    isPerson: true 
  },
  { 
    name: 'Kaz Nejatian', 
    description: 'COO, Shopify', 
    isPerson: true 
  },
];

export const RETAILERS: Investor[] = [
  { name: '7-Eleven', logo: 'https://1000logos.net/wp-content/uploads/2020/09/Logo-7-Eleven.jpg' },
  { name: 'FairPrice', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/63/FairPrice_logo.svg/250px-FairPrice_logo.svg.png' },
  { name: 'Sheng Siong', logo: 'https://wp.logos-download.com/wp-content/uploads/2016/12/Sheng_Siong_logo_logotype.png?dl' },
  { name: 'Jaya Grocer', logo: 'https://media.licdn.com/dms/image/sync/v2/D4E27AQH6p6bjAgNc7Q/articleshare-shrink_800/B4EZlYq7qzGYAI-/0/1766741275514?e=2147483647&v=beta&t=sic_KhfwxiLY8f6IvDxmQU177WfQDp8wLodPVWdWHms' },
  { name: 'Village Grocer', logo: 'https://villagegrocer.com.my/wp-content/uploads/2020/07/Village-Grocer-Logo.jpg' },
  { name: 'Reliance Smart', logo: 'https://searchlogovector.com/wp-content/uploads/2020/04/reliance-smart-logo-vector.png' },
  { name: 'Modern Bazaar', logo: 'https://www.gmraerocity.com/wp-content/themes/gmr-aerocity/images/logos/modern-bazaar.png' },
  { name: 'AS Watson', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/ASW_LOGO.png' },
  { name: 'Circle K', logo: 'https://logos-world.net/wp-content/uploads/2022/04/Circle-K-Logo.png' },
  { name: 'Park\'n Shop', logo: 'https://play-lh.googleusercontent.com/Fr3NwM9I2Ja0Mczzxj8V5e_AkFbHB5v4IRS2CKkA0ni_33WIftP1GBZteE6rsNaRzBn5' },
];

export const ADAPT_SYSTEMS: AdaptSystemCard[] = [
  {
    detection: "Heat wave detected in Zone 4",
    reasoning: "Evaluating spoilage risk and harvest timing...",
    action: "Harvest shifted 12 hours earlier. Pre-cooling activated."
  },
  {
    detection: "Port congestion spike detected",
    reasoning: "Recalculating routing and cold-chain exposure...",
    action: "Fleet rerouted. Inventory absorbed by nearby micro-hubs."
  },
  {
    detection: "Unexpected demand surge in regional retail cluster",
    reasoning: "Balancing supply across live inventory nodes...",
    action: "Replenishment orders issued automatically."
  }
];
