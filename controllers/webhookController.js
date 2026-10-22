export const handleIncomingWebhook = async (req, res, next) => {
  try {
    const { apiKey } = req.params;
    const payload = req.body;

    res.status(200).json({
      success: true,
      message: 'Webhook received and processed successfully',
      payload,
    });
  } catch (error) {
    next(error);
  }
};