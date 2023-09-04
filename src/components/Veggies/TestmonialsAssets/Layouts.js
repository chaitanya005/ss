import tw from "twin.macro";
// import "twin.macro";

export const Container = tw.div`relative`;
// export const Container = () => <div tw="relative" />;
// export const ContentWithPaddingXl = () => (
//   <div tw="max-w-screen-xl mx-auto py-20 lg:py-24" />
// );
// export const ContentWithPaddingLg = () => (
//   <div tw="max-w-screen-xl mx-auto py-20 lg:py-24" />
// );
// export const ContentWithVerticalPadding = () => <div tw="py-20 lg:py-24" />;
// export const Content2Xl = () => <div tw="max-w-screen-xl mx-auto" />;

export const ContentWithPaddingXl = tw.div`max-w-screen-xl mx-auto py-20 lg:py-24`;
export const ContentWithPaddingLg = tw.div`max-w-screen-lg mx-auto py-20 lg:py-24`;
export const ContentWithVerticalPadding = tw.div`py-20 lg:py-24`;
export const Content2Xl = tw.div`max-w-screen-xl mx-auto`;
