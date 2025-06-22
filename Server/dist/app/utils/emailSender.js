"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailHelper = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const util_1 = require("util");
const handlebars_1 = __importDefault(require("handlebars"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const ReadFile = (0, util_1.promisify)(fs.readFile);
const sendEmail = (email, resetLink) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: config_1.default.sender_email,
            pass: config_1.default.sender_app_password,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    yield transporter.sendMail({
        from: '"Tasko Team" <noreply@tasko.com>',
        to: email,
        subject: '🔐 Reset Your Tasko Password',
        html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Reset Your Tasko Password</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
    <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">
        <tr>
            <td style="padding: 40px 20px; text-align: center;">
                <table role="presentation" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);">
                    
                    <!-- Header with Logo and Brand -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); padding: 50px 30px; text-align: center; position: relative;">
                            <!-- Decorative elements -->
                            <div style="position: absolute; top: 20px; left: 30px; width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.7;"></div>
                            <div style="position: absolute; bottom: 20px; right: 30px; width: 40px; height: 40px; background: rgba(255,255,255,0.1); border-radius: 50%; opacity: 0.5;"></div>
                            
                            <!-- Logo/Icon -->
                            <div style="background: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(10px);">
                                <span style="font-size: 40px; color: #ffffff;">🔒</span>
                            </div>
                            
                            <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">TASKO</h1>
                            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px; font-weight: 400;">Ultimate Task Management</p>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 50px 40px;">
                            <!-- Greeting -->
                            <h2 style="color: #1f2937; margin: 0 0 10px 0; font-size: 28px; font-weight: 600; text-align: center;">Password Reset Request</h2>
                            <p style="color: #6b7280; margin: 0 0 30px 0; font-size: 16px; text-align: center; line-height: 1.6;">Hello Dear! We received a request to reset your password.</p>
                            
                            <!-- Security Notice -->
                            <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px; margin: 0 0 30px 0;">
                                <p style="color: #92400e; margin: 0; font-size: 14px; font-weight: 500;">🛡️ Security Notice</p>
                                <p style="color: #b45309; margin: 5px 0 0 0; font-size: 14px; line-height: 1.5;">This reset link will expire in <strong>20 minutes</strong> for your security.</p>
                            </div>
                            
                            <!-- Reset Button -->
                            <div style="text-align: center; margin: 40px 0;">
                                <table role="presentation" cellpadding="0" cellspacing="0" style="margin: 0 auto;">
                                    <tr>
                                        <td style="background: linear-gradient(135deg, #0d9488 0%, #0f766e 100%); border-radius: 8px; box-shadow: 0 4px 15px rgba(13, 148, 136, 0.4);">
                                            <a href="${resetLink}" target="_blank" style="display: inline-block; padding: 18px 40px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 8px; transition: all 0.3s ease;">
                                                🔐 Reset My Password
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            
                            <!-- Alternative Link -->
                            <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 30px 0;">
                                <p style="color: #374151; margin: 0 0 10px 0; font-size: 14px; font-weight: 500;">Can't click the button? Copy and paste this link:</p>
                                <p style="background: #ffffff; border: 1px solid #e5e7eb; border-radius: 4px; padding: 12px; margin: 0; font-size: 12px; color: #6b7280; word-break: break-all; font-family: monospace;">${resetLink}</p>
                            </div>
                            
                            <!-- Security Tips -->
                            <div style="border-top: 1px solid #e5e7eb; padding-top: 30px; margin-top: 30px;">
                                <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">🔍 Didn't request this?</h3>
                                <p style="color: #6b7280; margin: 0 0 15px 0; font-size: 14px; line-height: 1.6;">If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
                                <p style="color: #6b7280; margin: 0; font-size: 14px; line-height: 1.6;">For security reasons, consider changing your password if you suspect unauthorized access to your account.</p>
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); padding: 40px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                            <!-- Social Links -->
                            <div style="margin: 0 0 20px 0;">
                                <a href="#" style="display: inline-block; margin: 0 10px; text-decoration: none;">
                                    <span style="background: #3b82f6; color: white; padding: 8px 12px; border-radius: 50%; font-size: 14px;">📧</span>
                                </a>
                                <a href="#" style="display: inline-block; margin: 0 10px; text-decoration: none;">
                                    <span style="background: #1d4ed8; color: white; padding: 8px 12px; border-radius: 50%; font-size: 14px;">🐦</span>
                                </a>
                                <a href="#" style="display: inline-block; margin: 0 10px; text-decoration: none;">
                                    <span style="background: #0ea5e9; color: white; padding: 8px 12px; border-radius: 50%; font-size: 14px;">💼</span>
                                </a>
                            </div>
                            
                            <!-- Company Info -->
                            <h4 style="color: #374151; margin: 0 0 5px 0; font-size: 18px; font-weight: 600;">Tasko</h4>
                            <p style="color: #6b7280; margin: 0 0 15px 0; font-size: 14px;">The Ultimate Task Management Solution</p>
                            <p style="color: #9ca3af; margin: 0 0 10px 0; font-size: 12px;">This is an automated message, please do not reply to this email.</p>
                            <p style="color: #9ca3af; margin: 0; font-size: 12px;">© 2024 Tasko. All rights reserved.</p>
                            
                            <!-- Unsubscribe -->
                            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                                <a href="#" style="color: #6b7280; font-size: 12px; text-decoration: none;">Unsubscribe</a>
                                <span style="color: #d1d5db; margin: 0 8px;">|</span>
                                <a href="#" style="color: #6b7280; font-size: 12px; text-decoration: none;">Privacy Policy</a>
                                <span style="color: #d1d5db; margin: 0 8px;">|</span>
                                <a href="#" style="color: #6b7280; font-size: 12px; text-decoration: none;">Contact Support</a>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`,
    });
});
const createEmailContent = (data, templateType) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const templatePath = path.join(process.cwd(), `src/views/${templateType}.template.hbs`);
        const content = yield ReadFile(templatePath, 'utf8');
        const template = handlebars_1.default.compile(content);
        return template(data);
    }
    catch (error) {
        throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, error.message);
    }
});
exports.EmailHelper = {
    sendEmail,
    createEmailContent,
};
