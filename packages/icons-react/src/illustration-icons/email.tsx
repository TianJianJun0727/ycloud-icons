import { forwardRef } from 'react';
import type { IllustrationProps } from '../illustrationTypes';

const Email = forwardRef<SVGSVGElement, IllustrationProps>(
  ({ width = '100%', height = 'auto', alt = '', ...props }, ref) => (
    <svg
      ref={ref}
      viewBox="0 0 34 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      {...props}
    >
      <g>
        <path
          d="M28.3544 9.58611C28.564 9.93311 28.6875 10.3484 28.6875 10.7909C28.6875 10.792 28.6875 10.7932 28.6875 10.7943V22.3191C28.6875 23.691 27.5012 24.8066 26.0438 24.8066H7.95623C6.49905 24.8066 5.3125 23.691 5.3125 22.3191V10.7942C5.3125 9.42225 6.49878 8.30664 7.95623 8.30664H26.0438C26.4194 8.30664 26.777 8.38076 27.1013 8.51432L18.2281 16.2773C17.8474 16.6348 17.2296 16.6339 16.8 16.2333L10.4272 11.1565C10.2827 11.0407 10.0938 10.9703 9.88747 10.9703C9.42638 10.9703 9.05257 11.3221 9.05257 11.7561C9.05257 11.9958 9.16666 12.2105 9.34655 12.3546L15.669 17.3881C16.1488 17.84 16.8119 18.1196 17.5443 18.1196C17.5457 18.1196 17.5472 18.1196 17.5486 18.1196C18.2169 18.1196 18.8824 17.8831 19.3791 17.4138L28.3541 9.5862L28.3544 9.58611Z"
          fill="#4457FF"
        />
      </g>
    </svg>
  ),
);

Email.displayName = 'Email';

export default Email;
