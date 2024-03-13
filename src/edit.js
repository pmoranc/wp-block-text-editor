/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	RichText,
	BlockControls,
	InspectorControls,
	AlignmentToolbar,
	PanelColorSettings,
	withColors,
	ContrastChecker,
} from '@wordpress/block-editor';

import { PanelBody, TextControl, ToggleControl } from '@wordpress/components';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
function Edit( props ) {
	const {
		attributes,
		setAttributes,
		backgroundColor,
		textColor,
		setBackgroundColor,
		setTextColor,
	} = props;
	const { text, alignment } = attributes;

	const onChangeText = ( value ) => {
		setAttributes( { text: value } );
	};
	const onChangeAlignment = ( value ) => {
		setAttributes( { alignment: value } );
	};

	return (
		<>
			<InspectorControls>
				<PanelColorSettings
					title={ __( 'Color Settings', 'text-editor' ) }
					icon={ 'welcome-widgets-menus' }
					initialOpen
					colorSettings={ [
						{
							value: backgroundColor.color,
							onChange: setBackgroundColor,
							label: __( 'Background Color', 'text-editor' ),
						},
						{
							value: textColor.color,
							onChange: setTextColor,
							label: __( 'Text Color', 'text-editor' ),
						},
					] }
				>
					<ContrastChecker
						textColor={ textColor }
						backgroundColor={ backgroundColor }
					/>
				</PanelColorSettings>
				<PanelBody title={ __( 'Settings', 'text-editor' ) }>
					<TextControl
						label="Input Text"
						onChange={ onChangeText }
						value={ text }
					/>
					<ToggleControl
						label="Left"
						checked={ alignment === 'left' }
						onChange={ () => onChangeAlignment( 'left' ) }
					/>
				</PanelBody>
			</InspectorControls>
			<BlockControls>
				<AlignmentToolbar
					value={ alignment }
					onChange={ onChangeAlignment }
				/>
			</BlockControls>

			<RichText
				{ ...useBlockProps( {
					className: `text-editor-${ alignment }`,
					style: {
						backgroundColor: backgroundColor.color,
						color: textColor.color,
					},
				} ) }
				onChange={ onChangeText }
				value={ text }
				tagName="h4"
				placeholder={ __( 'Enter some text', 'text-editor' ) }
				allowedFormats={ [] }
			/>
		</>
	);
}

export default withColors( {
	backgroundColor: 'backgroundColor',
	textColor: 'color',
} )( Edit );
