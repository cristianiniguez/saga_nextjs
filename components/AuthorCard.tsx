import { Typography } from '@ui/Typography'
import Image from '@components/Image'

export function AuthorCard({
  fullName,
  biography,
  photo,
  linkedIn,
  twitter,
}: Author) {
  return (
    <div className="md:flex">
      <div className="pr-8 pb-4 flex-shrink-0">
        <Image
          src={photo.url}
          width={192}
          layout="intrinsic"
          aspectRatio="1:1"
        />
      </div>
      <div>
        <Typography variant="h5" component="p">
          {fullName}
        </Typography>
        <Typography variant="body1" color="textSecondary" className="py-4">
          {biography}
        </Typography>
        <div className="flex">
          <a
            href={linkedIn}
            title={`Follow ${fullName} on LinkedIn`}
            target="_blank"
            className="pr-4"
          >
            LI
          </a>
          <a
            href={twitter}
            title={`Follow ${fullName} on Twitter`}
            target="_blank"
            className="pr-4"
          >
            TW
          </a>
        </div>
      </div>
    </div>
  )
}
