/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	RichText,
	getColorClassName,
} from '@wordpress/block-editor';
import classnames from 'classnames';

export default function save( { attributes } ) {
	const {
		text,
		alignment,
		backgroundColor,
		textColor,
		customBackgroundColor,
		customTextColor,
	} = attributes;

	const backgroundClass = getColorClassName(
		'background-color',
		backgroundColor
	);
	const textClass = getColorClassName( 'color', textColor );
	const classes = classnames( `text-editor-${ alignment }`, {
		[ backgroundClass ]: backgroundClass,
		[ textClass ]: textClass,
	} );
	return (
		<RichText.Content
			{ ...useBlockProps.save( {
				className: classes,
				style: {
					backgroundColor: backgroundClass
						? undefined
						: customBackgroundColor,
					color: textClass ? undefined : customTextColor,
				},
			} ) }
			tagName="h4"
			value={ text }
		/>
	);
}
