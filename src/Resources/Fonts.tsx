import { Platform } from 'react-native';

const font = {
  SEGOE_UI_LIGHT: Platform.OS == 'ios' ? 'SegoeUI-Light' : 'SegoeUILight',
  SEGOE_UI_LIGHT_ITALIC: Platform.OS == 'ios'?'SegoeUI-LightItalic' : 'SegoeUILightItalic',
  SEGOE_UI_SEMILIGHT: Platform.OS == 'ios' ? 'SegoeUI-Semilight' : 'SegoeUISemilight',
  SEGOE_UI_SEMILIGHT_ITALIC: Platform.OS == 'ios' ? 'SegoeUI-SemilightItalic' : 'SegoeUISemilightItalic',
  SEGOE_UI: 'SegoeUI',
  SEGOE_UI_ITALIC: Platform.OS == 'ios' ? 'SegoeUI-Italic' : 'SegoeUIItalic',
  SEGOE_UI_SEMIBOLD: Platform.OS == 'ios' ? 'SegoeUI-Semibold' : 'SegoeUISemibold',
  SEGOE_UI_SEMIBOLD_ITALIC: Platform.OS == 'ios' ? 'SegoeUI-SemiboldItalic' : 'SegoeUISemiboldItalic' ,
  SEGOE_UI_BOLD: Platform.OS == 'ios' ? 'SegoeUI-Bold' : 'SegoeUIBold',
  SEGOE_UI_BOLD_ITALIC: Platform.OS == 'ios' ? 'SegoeUI-BoldItalic' : 'SegoeUIBoldItalic' ,
  SEGOE_UI_BLACK: 'SegoeUIBlack' ,
  SEGOE_UI_BLACK_ITALIC: Platform.OS == 'ios' ? 'SegoeUI-BlackItalic' : 'SegoeUIBlackItalic',
}

export default font;