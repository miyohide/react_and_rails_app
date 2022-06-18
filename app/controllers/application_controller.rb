class ApplicationController < ActionController::Base
  # CSRFトークンが提供されない場合はRailsが空セッションで応答する
  # これにより他のスクリプトが認証済みセッションを悪用するのを防止する
  protect_from_forgery with: :null_session
end
