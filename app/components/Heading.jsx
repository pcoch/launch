import Widget from "./Widget";
import { motion } from "framer-motion";

export default function Heading() {
  const heading = "Shopify Time To Launch Calculator".split(" ");

  return (
    <div className="flex flex-1 flex-col justify-center m-10">
      <h5 className="text-[#F0FBCC] richtext text-t7 uppercase font-medium leading-none pb-xs text-eyebrow-dark-text pb-4">
        CALCULATE TIME TO LAUNCH VALUE
      </h5>
      <h1 className="text-white text-5xl pb-8">
        {heading.map((el, i) => (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.35,
              delay: i / 10,
            }}
            key={i}>
            {el}{" "}
          </motion.span>
        ))}
      </h1>
      <p className="text-white py-2">
        See how launching faster on Shopify can help your business increase
        revenue. Based on real data and research conducted by a leading
        consulting firm.
      </p>
      <Widget />
    </div>
  );
}
