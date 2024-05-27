import { Separator } from '~/components/ui/separator';

const SectionTitle = ({ text }: { text: string }) => {
  return (
    <div>
      <h2 className='text-3xl text-center font-medium tracking-wider capitalize mb-8'>
        {text}
      </h2>
      <Separator />
    </div>
  );
};
export default SectionTitle;